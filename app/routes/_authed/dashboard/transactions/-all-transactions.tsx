/* the dash (-) in the file name means that this is a component that will only
   exist in the /transactions route, but it does not create a route automatically
 */
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import numeral from 'numeral'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Link, useRouter } from '@tanstack/react-router'
import { format } from 'date-fns'
import { Library, PencilIcon } from 'lucide-react'
import { useState } from 'react'
export interface Transaction {
  id: number
  description: string
  amount: string
  category: string | null
  transactionDate: string
  transactionType: 'income' | 'expense' | null
}
interface Props {
  month: number
  year: number
  yearsRange: number[]
  transactions: Transaction[]
}
const AllTransactions = ({ month, year, yearsRange, transactions }: Props) => {
  const router = useRouter()
  const [selectedYear, setSelectedYear] = useState(year)
  const [selectedMonth, setSelectedMonth] = useState(month)
  const selectedDate = new Date(year, month - 1, 1)
  return (
    <Card className={'mt-4'}>
      <CardHeader>
        <CardTitle>
          <span className={'flex justify-between'}>
            {format(selectedDate, 'MMM yyyy')} Transactions
            <div className={'flex gap-1'}>
              <Select
                value={selectedMonth.toString()}
                onValueChange={(value) => setSelectedMonth(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }).map((_, idx) => {
                    return (
                      <SelectItem value={`${idx + 1}`} key={idx}>
                        {format(
                          new Date(selectedDate.getFullYear(), idx, 1),
                          'MMM',
                        )}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <Select
                value={selectedYear.toString()}
                onValueChange={(value) => setSelectedYear(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {yearsRange.map((year) => (
                    <SelectItem value={year.toString()} key={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button asChild>
                <Link
                  to={'/dashboard/transactions'}
                  search={{
                    month: selectedMonth,
                    year: selectedYear,
                  }}
                >
                  Go
                </Link>
              </Button>
            </div>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link to={'/dashboard/transactions/new'}>New Transaction</Link>
        </Button>
        {!transactions?.length ? (
          <p className={'text-center py-10 text-lg text-muted-foreground'}>
            There are no transactions for this month
          </p>
        ) : (
          <Table className={'mt-4'}>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((row) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>
                      {format(row.transactionDate, 'do MMM yyyy')}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell className={'capitalize'}>
                      <Badge
                        className={
                          row.transactionType === 'income'
                            ? 'bg-lime-500'
                            : 'bg-orange-500'
                        }
                      >
                        {row.transactionType}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>
                      £{numeral(row.amount).format('0,0[.]00')}
                    </TableCell>
                    <TableCell className={'text-right'}>
                      <Button
                        asChild
                        variant={'outline'}
                        size={'icon'}
                        aria-label={'edit transaction'}
                      >
                        <Link
                          onClick={() => {
                            // invalidate cache
                            router.clearCache({
                              filter: (route) =>
                                route.pathname !==
                                `/dashboard/transactions/${row.id}`,
                            })
                          }}
                          to={`/dashboard/transactions/${row.id}`}
                        >
                          <PencilIcon />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

export default AllTransactions
