import { authMiddleware } from '@/authMiddleware'
import { db } from '@/db'
import { transactionsTable } from '@/db/schema'
import { createServerFn } from '@tanstack/start'
import { asc, desc, eq } from 'drizzle-orm'

export const getTransactionYearsRange = createServerFn({
  method: 'GET',
})
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const today = new Date()
    const currentYear = today.getFullYear()
    const [earliestTransaction] = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.userId, context.userId))
      .orderBy(asc(transactionsTable.transactionDate))
      .limit(1)

    const earliestYear = earliestTransaction
      ? new Date(earliestTransaction.transactionDate).getFullYear()
      : currentYear

    const years = Array.from({ length: currentYear - earliestYear + 1 }).map(
      (_, idx) => currentYear - idx,
    )

    return years
  })
