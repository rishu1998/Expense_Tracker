import { useContext } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import {
  incomeCategories,
  expenseCategories,
  resetCategories,
} from './constants/categories'
import { ExpenseTrackerContext } from './context/context'
ChartJS.register(ArcElement, Tooltip, Legend)

const useTransactions = (title) => {
  resetCategories()
  const { transactions } = useContext(ExpenseTrackerContext)
  const transactionsPerType = transactions.filter((e) => e.type === title)

  const total = transactionsPerType.reduce(
    (acc, currval) => (acc += currval.amount),
    0,
  )

  //ye upper valo ke liye example hai
  // transaction data would be like this
  // [
  //     {id:1,type:'Income',amount:50,category:'Salary'},
  //     {id:2,type:'Expense',amount:350,category:'Pets'},
  //     {id:3,type:'Income',amount:500,category:'Salary'},
  //     {id:4,type:'Expense',amount:10,category:'Business'}
  // ]

  //ye neeche vale ke liye example hai
  //   export const incomeCategories = [
  //     { type: 'Business', amount: 0, color: incomeColors[0] },
  //     { type: 'Investments', amount: 0, color: incomeColors[1] },
  //     { type: 'Extra income', amount: 0, color: incomeColors[2] },

  //   ]

  const categories = title === 'Income' ? incomeCategories : expenseCategories

  transactionsPerType.forEach((t) => {
    const category = categories.find((c) => c.type === t.category)
    if (category) category.amount += t.amount
  })

  const filteredCategories = categories.filter((c) => c.amount > 0)

  const chartData = {
    labels: filteredCategories.map((c) => c.type),
    datasets: [
      {
        data: [...filteredCategories.map((c) => c.amount)],
        backgroundColor: filteredCategories.map((c) => c.color),
      },
    ],
  }
  return { total, chartData }
}

export default useTransactions
