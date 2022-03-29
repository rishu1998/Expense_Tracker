import React from 'react'
import { useContext } from 'react'
import {
  List as MUIList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Slide,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import useStyles from './liststyles'
import { ExpenseTrackerContext } from '../../../context/context'
const List = () => {
  const { deleteTransaction, transactions } = useContext(ExpenseTrackerContext)
  const classes = useStyles()
  //dont need to create static transactions now as we are now getting transaction from context.js file
  // const transactions = [
  //   {
  //     id: 1,
  //     type: 'Income',
  //     category: 'Salary',
  //     amount: 50,
  //     date: 'Fri Mar 25',
  //   },
  //   {
  //     id: 2,
  //     type: 'Expense',
  //     category: 'Pets',
  //     amount: 20,
  //     date: 'Fri Mar 15',
  //   },
  //   {
  //     id: 3,
  //     type: 'Income',
  //     category: 'Business',
  //     amount: 150,
  //     date: 'Fri Mar 5',
  //   },
  // ]

  return (
    <MUIList dense={false} className={classes.list}>
      {transactions.map((transaction) => (
        <Slide
          direction="down"
          in
          mountOnEnter
          unmountOnExit
          key={transaction.id}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar
                className={
                  transaction.type === 'Income'
                    ? classes.avatarIncome
                    : classes.avatarExpense
                }
              >
                ₹
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={transaction.category}
              secondary={`Rs${transaction.amount} - ${transaction.date}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  deleteTransaction(transaction.id)
                }}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))}
    </MUIList>
  )
}
export default List
