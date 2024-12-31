import { drizzle } from 'drizzle-orm/neon-http'
import { categoriesTable, transactionsTable } from '@/db/schema'
import dotenv from 'dotenv'

dotenv.config()
const db = drizzle(process.env.DATABASE_URL!)

async function main() {
  type Transaction = {
    user_id: string
    description: string
    amount: number
    transaction_date: string // Date as a string in YYYY-MM-DD format
    category_id: number
  }

  const transactions: (typeof transactionsTable.$inferInsert)[] = []

  const userId: string = 'user_2qo44VpEJKl1FOfKnKZgJXPmurg'
  const currentDate: Date = new Date()
  const startDate: Date = new Date()
  startDate.setFullYear(currentDate.getFullYear() - 3) // 3 years ago

  // Helper function to get a random day for a given month/year
  function getRandomDay(year: number, month: number): number {
    const daysInMonth = new Date(year, month + 1, 0).getDate() // Get the number of days in the month
    return Math.floor(Math.random() * daysInMonth) + 1 // Random day between 1 and daysInMonth
  }

  // Generate 36 months of transactions
  for (let i = 0; i < 36; i++) {
    const transactionDate: Date = new Date(startDate)
    transactionDate.setMonth(startDate.getMonth() + i)

    // Randomize the day of the month
    const randomDay: number = getRandomDay(
      transactionDate.getFullYear(),
      transactionDate.getMonth(),
    )
    transactionDate.setDate(randomDay)

    // Generate random income and expense amounts
    const isIncome: boolean = i % 2 === 0 // Even months for income, odd for expense
    const amount: number = isIncome
      ? parseFloat((Math.random() * 3000 + 2000).toFixed(2)) // Income between 2000 and 5000
      : parseFloat((Math.random() * 500 + 50).toFixed(2)) // Expense between 50 and 550

    const categoryId: number = isIncome ? 1 : 2 // Assuming category 1 is 'Salary' (income), category 2 is 'Groceries' (expense)
    const description: string = isIncome
      ? 'Salary Payment'
      : 'Groceries Purchase'

    transactions.push({
      userId: userId,
      description: description,
      amount: amount.toString(),
      transactionDate: transactionDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
      categoryId: categoryId,
    })
  }

  console.log(transactions)

  await db.insert(transactionsTable).values(transactions)
}

main()
