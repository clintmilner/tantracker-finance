import AllTransactions from '@/app/routes/_authed/dashboard/transactions/-all-transactions'
import { getTransactionYearsRange } from '@/data/getTransactionYearsRange'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
const today = new Date()
const searchSchema = z.object({
  month: z
    .number()
    .min(1)
    .max(12)
    .catch(today.getMonth() + 1)
    .optional(),
  year: z
    .number()
    .min(today.getFullYear() - 100)
    .max(today.getFullYear())
    .catch(today.getFullYear())
    .optional(),
})

export const Route = createFileRoute(
  '/_authed/dashboard/transactions/_layout/',
)({
  component: RouteComponent,
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => {
    const today = new Date()
    return {
      month: search.month ?? today.getMonth() + 1,
      year: search.year ?? today.getFullYear(),
    }
  },
  loader: async ({ deps: { month, year } }) => {
    const yearsRange = await getTransactionYearsRange()
    return { month, year, yearsRange }
  },
})

function RouteComponent() {
  const { month, year, yearsRange } = Route.useLoaderData()
  return <AllTransactions month={month} year={year} yearsRange={yearsRange} />
}
