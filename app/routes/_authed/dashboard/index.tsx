import CashflowChart from '@/app/routes/_authed/dashboard/-cashflowChart'
import RecentTransactions from '@/app/routes/_authed/dashboard/-recent-transactions'
import { getAnnualCashflow } from '@/data/getAnnualCashflow'
import { getRecentTransactions } from '@/data/getRecentTransactions'
import { getTransactionYearsRange } from '@/data/getTransactionYearsRange'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const today = new Date()
const schema = z.object({
  financialYear: z
    .number()
    .min(today.getFullYear() - 100)
    .max(today.getFullYear())
    .catch(today.getFullYear())
    .optional(),
})
export const Route = createFileRoute('/_authed/dashboard/')({
  validateSearch: schema,
  component: RouteComponent,
  loaderDeps: ({ search }) => ({ financialYear: search.financialYear }),
  loader: async ({ deps }) => {
    const [transactions, cashflow, yearsRange] = await Promise.all([
      getRecentTransactions(),
      getAnnualCashflow({
        data: {
          year: deps.financialYear ?? today.getFullYear(),
        },
      }),
      getTransactionYearsRange(),
    ])
    return {
      transactions,
      cashflow,
      yearsRange,
      financialYear: deps.financialYear ?? today.getFullYear(),
    }
  },
})

function RouteComponent() {
  const { transactions, cashflow, yearsRange, financialYear } =
    Route.useLoaderData()
  return (
    <main className={'max-w-screen-xl mx-auto py-5'}>
      <h1 className={'text-4xl font-semibold pb-5'}>Dashboard</h1>
      <CashflowChart
        cashflow={cashflow}
        yearsRange={yearsRange}
        financialYear={financialYear}
      />
      <RecentTransactions transactions={transactions} />
    </main>
  )
}
