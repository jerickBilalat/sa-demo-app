import React from 'react'
import Link from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {LinearProgressWithLabel} from './lib'
import currency from 'currency.js'

function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  )
}

function preventDefault(event) {
  event.preventDefault()
}

const useStyles = makeStyles({
  cardContext: {
    flex: 1,
  },
})

function formatWithCurrency(value) {
  return currency(value).format()
}

function EmrFundCard({emrCommitment, emrGoal, emrCurrentBalance, status}) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Emergency Fund</Title>
      <Typography component="p" variant="h4">
        {emrCurrentBalance}
      </Typography>
      <LinearProgressWithLabel value={status} />
      <Typography color="textSecondary" className={classes.cardContext}>
        {emrGoal} is your current Emergency Fund Goal. {emrCommitment} is
        transfered to this fund every period (change this amount in settings).
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Use Fund |
        </Link>
        <Link color="primary" href="#" onClick={preventDefault}>
          | View Transactions
        </Link>
      </div>
    </React.Fragment>
  )
}

function BudgetCard({remainingBudget, budget, spent, status}) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Remaining Budget</Title>
      <Typography component="p" variant="h4">
        {remainingBudget}
      </Typography>
      <LinearProgressWithLabel value={status} />
      <Typography color="textSecondary" className={classes.cardContext}>
        Spent {spent} out of your {budget} budget for this period. Please spend
        wisely.
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Use Fund |
        </Link>
        <Link color="primary" href="#" onClick={preventDefault}>
          | View Transactions
        </Link>
      </div>
    </React.Fragment>
  )
}

function FreeMoneyCard() {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Sludge Money</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.cardContext}>
        Spludge! You deserve it. Spend it freely. Make mermories out it.
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Spludge |
        </Link>
        <Link color="primary" href="#" onClick={preventDefault}>
          | View Spludges
        </Link>
      </div>
    </React.Fragment>
  )
}

export {EmrFundCard, FreeMoneyCard, BudgetCard}
