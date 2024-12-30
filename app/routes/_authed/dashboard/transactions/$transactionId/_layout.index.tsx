import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import TransactionForm, { FormData } from '@/components/ui/TransactionForm'
import { deleteTransaction } from '@/data/deleteTransaction'
import { getCategories } from '@/data/getCategories'
import { getTransaction } from '@/data/getTransaction'
import { updateTransaction } from '@/data/updateTransaction'
import { useToast } from '@/hooks/use-toast'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { format } from 'date-fns'
import { Trash2Icon } from 'lucide-react'

import React, { useState } from 'react'
import { number, z } from 'zod'
export interface Transaction {
  transactionType: 'income' | 'expense'
  amount: number
  categoryId: number
  description: string
  transactionDate: Date
}
export const Route = createFileRoute(
  '/_authed/dashboard/transactions/$transactionId/_layout/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => {
    return (
      <div className={'mt-12 text-3xl text-muted-foreground text-center'}>
        Oops! Transaction not found ☠️
      </div>
    )
  },
  loader: async ({ params }) => {
    const [categories, transaction] = await Promise.all([
      getCategories(),
      getTransaction({
        data: {
          transactionId: Number(params.transactionId),
        },
      }),
    ])

    return { categories, transaction }
  },
})

function RouteComponent() {
  const { categories, transaction } = Route.useLoaderData()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [deleting, setDeleting] = useState(false)

  const defaultValues: Transaction = {
    amount: Number(transaction?.amount),
    categoryId: transaction?.categoryId,
    description: transaction?.description,
    transactionDate: new Date(transaction?.transactionDate),
    transactionType:
      categories.find((category) => category.id === transaction?.categoryId)
        ?.type ?? 'income',
  }
  const handleSubmit = async (data: FormData) => {
    if (data) {
      await updateTransaction({
        data: {
          id: transaction.id,
          amount: data.amount,
          description: data.description,
          transactionDate: format(data.transactionDate, 'yyyy-MM-dd'),
          categoryId: data.categoryId,
        },
      })
      toast({
        title: 'Success',
        description: 'Transaction updated',
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
  }
  const handleDeleteConfirm = async () => {
    setDeleting(true)
    await deleteTransaction({
      data: {
        transactionId: transaction.id,
      },
    })
    toast({
      title: 'Success',
      description: 'Transaction deleted',
      className: 'bg-green-500 text-white',
    })
    setDeleting(false)

    await navigate({
      to: '/dashboard/transactions',
      search: {
        month: Number(transaction.transactionDate.split('-').at(1)),
        year: Number(transaction.transactionDate.split('-').at(0)),
      },
    })
  }

  return (
    <Card className={'max-w-screen-md mt-4'}>
      <CardHeader>
        <CardTitle className={'flex justify-between'}>
          <span>Edit Transaction</span>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={'destructive'} size={'icon'}>
                <Trash2Icon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are your absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action is permanent. Transaction cannot be recovered.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  disabled={deleting}
                  variant={'destructive'}
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TransactionForm
          categories={categories}
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
        />
      </CardContent>
    </Card>
  )
}
