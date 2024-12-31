import CashflowChart from '@/app/routes/_authed/dashboard/-cashflowChart'
import RecentTransactions from '@/app/routes/_authed/dashboard/-recent-transactions'
import { getAnnualCashflow } from '@/data/getAnnualCashflow'
import { getRecentTransactions } from '@/data/getRecentTransactions'
import { getTransactionYearsRange } from '@/data/getTransactionYearsRange'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const today = new Date()
const schema = z.object({
  year: z
    .number()
    .min(today.getFullYear() - 100)
    .max(today.getFullYear())
    .catch(today.getFullYear())
    .optional(),
})
export const Route = createFileRoute('/_authed/dashboard/')({
  validateSearch: schema,
  component: RouteComponent,
  loaderDeps: ({ search }) => ({ year: search.year }),
  loader: async ({ deps }) => {
    const year = deps.year ?? today.getFullYear()
    const [transactions, cashflow, yearsRange] = await Promise.all([
      getRecentTransactions(),
      getAnnualCashflow({
        data: {
          year,
        },
      }),
      getTransactionYearsRange(),
    ])
    return { transactions, cashflow, yearsRange, year }
  },
})

function RouteComponent() {
  const { transactions, cashflow, yearsRange, year } = Route.useLoaderData()
  return (
    <main className={'max-w-screen-xl mx-auto py-5'}>
      <h1 className={'text-4xl font-semibold pb-5'}>Dashboard</h1>
      <CashflowChart cashflow={cashflow} yearsRange={yearsRange} year={year} />
      <RecentTransactions transactions={transactions} />
    </main>
  )
}
