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

  const categoriesSeedData = [
    { id: 1, name: 'Salary', type: 'income' },
    { id: 2, name: 'Rental Income', type: 'income' },
    { id: 3, name: 'Business Income', type: 'income' },
    { id: 4, name: 'Investments', type: 'income' },
    { id: 5, name: 'Other Income', type: 'income' },
    { id: 6, name: 'Housing', type: 'expense' },
    { id: 7, name: 'Transport', type: 'expense' },
    { id: 8, name: 'Food & Groceries', type: 'expense' },
    { id: 9, name: 'Health', type: 'expense' },
    { id: 10, name: 'Entertainment & Leisure', type: 'expense' },
    { id: 11, name: 'Other Expenses', type: 'expense' },
  ]

  // Helper function to get a random day for a given month/year
  function getRandomDay(year: number, month: number): number {
    const daysInMonth = new Date(year, month + 1, 0).getDate() // Get the number of days in the month
    return Math.floor(Math.random() * daysInMonth) + 1 // Random day between 1 and daysInMonth
  }

  // Iterate over 5 years and 12 months per year
  for (let year = 2020; year < 2025; year++) {
    // From 2020 to 2024
    for (let month = 0; month < 12; month++) {
      // Months 0 to 11 (January to December)

      // Randomize 5 expense categories
      const expenseCategories = categoriesSeedData.filter(
        (cat) => cat.type === 'expense',
      )
      const randomExpenseCategories: {
        id: number
        name: string
        type: string
      }[] = [] // Explicitly typing the array

      while (randomExpenseCategories.length < 5) {
        const randomCategory =
          expenseCategories[
            Math.floor(Math.random() * expenseCategories.length)
          ]
        if (!randomExpenseCategories.includes(randomCategory)) {
          randomExpenseCategories.push(randomCategory)
        }
      }

      // Randomize 2 income categories
      const incomeCategories = categoriesSeedData.filter(
        (cat) => cat.type === 'income',
      )
      const randomIncomeCategories: {
        id: number
        name: string
        type: string
      }[] = [] // Explicitly typing the array

      while (randomIncomeCategories.length < 2) {
        const randomCategory =
          incomeCategories[Math.floor(Math.random() * incomeCategories.length)]
        if (!randomIncomeCategories.includes(randomCategory)) {
          randomIncomeCategories.push(randomCategory)
        }
      }

      // Generate 5 expense transactions for this month
      randomExpenseCategories.forEach((randomCategory) => {
        const randomDay = getRandomDay(year, month)
        const amount = parseFloat((Math.random() * 1500 + 10).toFixed(2)) // Expense between 10 and 1510
        const description = `Expense on ${randomCategory.name}`
        transactions.push({
          userId: userId,
          description: description,
          amount: amount.toString(),
          transactionDate: `${year}-${String(month + 1).padStart(2, '0')}-${String(randomDay).padStart(2, '0')}`,
          categoryId: randomCategory.id,
        })
      })

      // Generate 2 income transactions for this month
      randomIncomeCategories.forEach((randomCategory) => {
        const randomDay = getRandomDay(year, month)
        const amount = parseFloat((Math.random() * 3000 + 2000).toFixed(2)) // Income between 2000 and 5000
        const description = `Income from ${randomCategory.name}`
        transactions.push({
          userId: userId,
          description: description,
          amount: amount.toString(),
          transactionDate: `${year}-${String(month + 1).padStart(2, '0')}-${String(randomDay).padStart(2, '0')}`,
          categoryId: randomCategory.id,
        })
      })
    }
  }

  console.log(`Generated ${transactions.length} transactions.`)

  // Insert the generated transactions into the database
  await db.insert(transactionsTable).values(transactions)
}

main()
