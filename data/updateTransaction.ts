import { authMiddleware } from '@/authMiddleware'
import { db } from '@/db'
import { transactionsTable } from '@/db/schema'
import { createServerFn } from '@tanstack/start'
import { addDays } from 'date-fns'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

const schema = z.object({
  id: z.number(),
  categoryId: z.coerce.number().positive('Please select a category'),
  transactionDate: z.string().refine((value) => {
    const parsedDate = new Date(value)
    // ensure date is valid
    // ensure date is not after tomorrow
    return !isNaN(parsedDate.getTime()) && parsedDate <= addDays(new Date(), 1)
  }),
  amount: z.coerce.number().positive('Amount must greater than 0'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(311, 'Description must contain a maximum of 311 characters'),
})

export const updateTransaction = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware])
  .validator((data: z.infer<typeof schema>) => schema.parse(data))
  .handler(async ({ context, data }) => {
    await db
      .update(transactionsTable)
      .set({
        amount: data.amount.toString(),
        categoryId: data.categoryId,
        transactionDate: data.transactionDate,
        description: data.description,
      })
      .where(
        and(
          eq(transactionsTable.userId, context.userId),
          eq(transactionsTable.id, data.id),
        ),
      )
  })
