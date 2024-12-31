import { Transaction } from '@/app/routes/_authed/dashboard/transactions/-all-transactions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Cashflow } from '@/data/getAnnualCashflow'
import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import numeral from 'numeral'

interface Props {
  transactions: Transaction[]
}

const RecentTransactions = ({ transactions }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={'flex justify-between'}>
          <span>Recent Transactions</span>
          <span className={'flex gap-2'}>
            <Button asChild variant={'outline'}>
              <Link to={'/dashboard/transactions'}>View All</Link>
            </Button>
            <Button asChild>
              <Link to={'/dashboard/transactions/new'}>Create New</Link>
            </Button>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
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

export default RecentTransactions
