import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from 'react'
import formatDate from '../../../utils/formatDate'
import { useSpeechContext } from '@speechly/react-client'
import {
  incomeCategories,
  expenseCategories,
} from '../../../constants/categories'
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import { useContext } from 'react'
import useStyles from './formstyles'
import { ExpenseTrackerContext } from '../../../context/context'

const initialState = {
  amount: '',
  category: '',
  type: 'Income',
  date: formatDate(new Date()),
}
const Form = () => {
  const { addTransaction } = useContext(ExpenseTrackerContext)
  const [formData, setFormData] = useState(initialState)
  const classes = useStyles()
  const { segment } = useSpeechContext()
  const createTransaction = () => {
    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    }
    addTransaction(transaction)
    setFormData(initialState)
  }
  useEffect(() => {
    if (segment) {
      console.log(segment.intent.intent)
      if (segment.intent.intent === 'add_expense') {
        setFormData({ ...formData, type: 'Expense' })
      } else if (segment.intent.intent === 'add_income') {
        setFormData({ ...formData, type: 'Income' })
      } else if (
        segment.isFinal &&
        segment.intent.intent === 'create_transaction'
      )
        return createTransaction()
      else if (
        segment.isFinal &&
        segment.intent.intent === 'cancel_transaction'
      )
        return setFormData(initialState)
    }
    // segment.entities.forEach((e) => {
    //   //   // const category = `${e.value.charAt(0)}${e.value
    //   //   // .slice(1)
    //   //   // .toLocaleLowerCase()}`
    //   switch (e.type) {
    //     case 'amount':
    //       setFormData({ ...formData, amount: e.value })
    //       break
    //     case 'category':
    //       setFormData({ ...formData, category: e.value })
    //       break
    //     case 'date':
    //       setFormData({ ...formData, date: e.value })
    //       break
    //     default:
    //       break
    //   }
    // })
  }, [segment])

  const selectedCategories =
    formData.type === 'Income' ? incomeCategories : expenseCategories
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment && <>{segment.words.map((w) => w.value).join(' ')}</>}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => {
              setFormData({ ...formData, type: e.target.value })
            }}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value })
            }}
          >
            {selectedCategories.map((c) => (
              <MenuItem key={c.type} value={c.type}>
                {c.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          value={formData.amount}
          onChange={(e) => {
            setFormData({ ...formData, amount: e.target.value })
          }}
          fullWidth
        ></TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          value={formData.date}
          onChange={(e) => {
            setFormData({ ...formData, date: formatDate(e.target.value) })
          }}
          label="Date"
          fullWidth
        ></TextField>
      </Grid>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        fullWidth
        onClick={createTransaction}
      >
        Create
      </Button>
    </Grid>
  )
}
export default Form
