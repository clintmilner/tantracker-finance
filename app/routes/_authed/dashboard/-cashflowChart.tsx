import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Cashflow } from '@/data/getAnnualCashflow'
import { cn } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import { format } from 'date-fns'
import numeral from 'numeral'
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts'

interface Props {
  cashflow: Cashflow[]
  yearsRange: number[]
  financialYear: number
}

const CashflowChart = ({ cashflow, yearsRange, financialYear }: Props) => {
  console.log(cashflow[0])
  const navigate = useNavigate()
  const chartConfig: ChartConfig = {
    income: {
      label: 'Income',
      color: '#84cc16',
    },
    expense: {
      label: 'Expense',
      color: '#f97316',
    },
  }
  const totalAnnualIncome = cashflow.reduce((prev: number, { income }) => {
    return prev + income
  }, 0)
  const totalAnnualExpenses = cashflow.reduce((prev: number, { expense }) => {
    return prev + expense
  }, 0)

  const balance = totalAnnualIncome - totalAnnualExpenses

  return (
    <Card className={'mb-5'}>
      <CardHeader>
        <CardTitle className={'flex justify-between'}>
          <span>Cashflow</span>
          <div>
            <Select
              defaultValue={financialYear.toString()}
              onValueChange={(value) => {
                console.log(value)
                navigate({
                  to: '/dashboard',
                  search: {
                    financialYear: value,
                  },
                })
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {yearsRange.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className={'grid grid-cols-[1fr_250px]'}>
        <ChartContainer config={chartConfig} className={'w-full h-[300px]'}>
          <BarChart data={cashflow}>
            <CartesianGrid vertical={false} />
            <YAxis
              tickFormatter={(value) => `£${numeral(value).format('0,0')}`}
            />
            <XAxis
              dataKey={'month'}
              tickFormatter={(month) => {
                return format(new Date(financialYear, month - 1, 1), 'MMM')
              }}
            />
            <Legend align={'right'} verticalAlign={'top'} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value, payload) => {
                    return (
                      <div>
                        {format(
                          new Date(
                            financialYear,
                            payload[0]?.payload?.month - 1,
                            1,
                          ),
                          'MMM',
                        )}
                      </div>
                    )
                  }}
                />
              }
            />
            <Bar dataKey={'income'} fill={'var(--color-income)'} radius={4} />
            <Bar dataKey={'expense'} fill={'var(--color-expense)'} radius={4} />
          </BarChart>
        </ChartContainer>
        <div className={'border-l px-4 flex flex-col gap-4 justify-center'}>
          <div>
            <span className={'text-muted-foreground font-bold text-sm'}>
              Income
            </span>
            <h2 className={'text-3xl'}>
              £{numeral(totalAnnualIncome).format('0,0[.]00')}
            </h2>
          </div>
          <div className={'border-t'}>
            <span className={'text-muted-foreground font-bold text-sm'}>
              Expenses
            </span>
            <h2 className={'text-3xl'}>
              £{numeral(totalAnnualExpenses).format('0,0[.]00')}
            </h2>
          </div>
          <div className={'border-t'}>
            <span className={'text-muted-foreground font-bold text-sm'}>
              Balance
            </span>
            <h2
              className={cn(
                'text-3xl font-bold',
                balance >= 0 ? 'text-lime-500' : 'text-orange-500',
              )}
            >
              £{numeral(balance).format('0,0[.]00')}
            </h2>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CashflowChart
