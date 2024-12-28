import { db } from '@/db'
import { categoriesTable } from '@/db/schema'
import { createServerFn } from '@tanstack/start'

export const getCategories = createServerFn({
  method: 'GET',
}).handler(async () => {
  return db.select().from(categoriesTable)
})
