import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import TransactionForm, { FormData } from '@/components/ui/TransactionForm'
import { createTransaction } from '@/data/createTransaction'
import { getCategories } from '@/data/getCategories'
import { useToast } from '@/hooks/use-toast'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { format } from 'date-fns'
import { z } from 'zod'

export const Route = createFileRoute(
  '/_authed/dashboard/transactions/new/_layout/',
)({
  component: RouteComponent,
  loader: async () => {
    const categories = await getCategories()
    return { categories }
  },
})

function RouteComponent() {
  const { categories } = Route.useLoaderData()
  const { toast } = useToast()
  const navigate = useNavigate()
  const handleSubmit = async (data: FormData) => {
    const transaction = await createTransaction({
      data: {
        amount: data.amount,
        categoryId: data.categoryId,
        description: data.description,
        transactionDate: format(data.transactionDate, 'yyyy-MM-dd'),
      },
    })

    toast({
      title: 'Success',
      description: 'Transaction created',
      className: 'bg-green-500 text-white',
    })
    await navigate({
      to: '/dashboard/transactions',
      search: {
        month: data.transactionDate.getMonth() + 1,
        year: data.transactionDate.getFullYear(),
      },
    })
  }
  return (
    <Card className={'max-w-screen-md mt-4'}>
      <CardHeader>
        <CardTitle>New Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <TransactionForm categories={categories} onSubmit={handleSubmit} />
      </CardContent>
    </Card>
  )
}
