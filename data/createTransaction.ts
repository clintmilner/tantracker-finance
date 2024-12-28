import { authMiddleware } from '@/authMiddleware'
import { FormData } from '@/components/ui/TransactionForm'
import { db } from '@/db'
import { transactionsTable } from '@/db/schema'
import { createServerFn } from '@tanstack/start'
import { addDays } from 'date-fns'
import { z } from 'zod'

const transactionSchema = z.object({
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

type ValidatorData = z.infer<typeof transactionSchema>

export const createTransaction = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware])
  .validator((data: ValidatorData) => {
    return transactionSchema.parse(data)
  })
  .handler(async ({ data, context }) => {
    // get userId using middleware
    const userId = context.userId
    const transaction = await db
      .insert(transactionsTable)
      .values({
        userId,
        amount: data.amount.toString(),
        description: data.description,
        categoryId: data.categoryId,
        transactionDate: data.transactionDate,
      })
      .returning()
    return transaction
  })
