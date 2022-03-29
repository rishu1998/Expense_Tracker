import React from 'react'
import useStyles from './mainstyles'
import List from './List/List'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider,
} from '@material-ui/core'
import Form from './Form/Form'
const Main = () => {
  const classes = useStyles()
  return (
    <Card className="classes.root">
      <CardHeader title="Expense Tracker" subheader="by Rishabh Rawat" />
      <CardContent>
        <Typography align="center" variant="h5">
          Total Balance Rs 1000
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ lineHeight: '1.5em', marginTop: '20px' }}
        >
          {/* {InfoCard} */}
          Try saying : Add income for Rs1000 in Category Salary for Monday ...
        </Typography>
        <Divider />
        <Form />
      </CardContent>
      <CardContent className={classes.cardContent}>
        <Grid container spacing={12}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
export default Main
