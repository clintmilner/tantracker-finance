/* the dash (-) in the file name means that this is a component that will only
   exist in the /transactions route, but it does not create a route automatically
 */
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { Library } from 'lucide-react'
import { useState } from 'react'
interface Props {
  month: number
  year: number
  yearsRange: number[]
}
const AllTransactions = ({ month, year, yearsRange }: Props) => {
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
                    year: 2024,
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
      </CardContent>
    </Card>
  )
}

export default AllTransactions
