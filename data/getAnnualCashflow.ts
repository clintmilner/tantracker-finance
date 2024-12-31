import { authMiddleware } from '@/authMiddleware'
import { db } from '@/db'
import { categoriesTable, transactionsTable } from '@/db/schema'
import { createServerFn } from '@tanstack/start'
import { and, eq, sql } from 'drizzle-orm'
import { z } from 'zod'
const schema = z.object({ year: z.number() })
export interface Cashflow {
  month: number
  income: number
  expense: number
}
export const getAnnualCashflow = createServerFn({
  method: 'GET',
})
  .middleware([authMiddleware])
  .validator((data: z.infer<typeof schema>) => schema.parse(data))
  .handler(async ({ context, data }) => {
    const cashflow = await db
      .select({
        month: sql<string>`EXTRACT(MONTH FROM ${transactionsTable.transactionDate})`,
        totalIncome: sql<string>`SUM(CASE WHEN ${categoriesTable.type} = 'income' THEN ${transactionsTable.amount} ELSE 0 END)`,
        totalExpenses: sql<string>`SUM(CASE WHEN ${categoriesTable.type} = 'expense' THEN ${transactionsTable.amount} ELSE 0 END)`,
      })
      .from(transactionsTable)
      .leftJoin(
        categoriesTable,
        eq(transactionsTable.categoryId, categoriesTable.id),
      )
      .where(
        and(
          eq(transactionsTable.userId, context.userId),
          sql`EXTRACT(YEAR FROM ${transactionsTable.transactionDate}) = ${data.year}`,
        ),
      )
      .groupBy(sql`EXTRACT(MONTH FROM ${transactionsTable.transactionDate})`)
      .orderBy(sql`EXTRACT(MONTH FROM ${transactionsTable.transactionDate})`)

    const annualCashflow: Cashflow[] = Array.from({ length: 12 }).map(
      (_, idx) => {
        const month = idx + 1
        const monthlyCashflow = cashflow.find(
          (record) => Number(record.month) === month,
        )

        return {
          month: month,
          income: Number(monthlyCashflow?.totalIncome ?? 0),
          expense: Number(monthlyCashflow?.totalExpenses ?? 0),
        }
      },
    )

    return annualCashflow
  })
