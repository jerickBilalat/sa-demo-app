import React from 'react'
import Link from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {LinearProgressWithLabel} from './lib'
import Button from '@material-ui/core/Button'

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

const useStyles = makeStyles(theme => ({
  cardContext: {
    flex: 1,
  },
  button: {
    margin: theme.spacing(0.5),
  },
}))

function EmrFundCard({emrCommitment, emrGoal, emrCurrentBalance, status}) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>
        Emergency Fund{' '}
        <Button variant="contained" color="default" className={classes.button}>
          Use
        </Button>
      </Title>
      <Typography component="p" variant="h4">
        {emrCurrentBalance}
      </Typography>
      <LinearProgressWithLabel value={status} />
      <Typography color="textSecondary" className={classes.cardContext}>
        {emrCommitment} is transfered to this fund every period (change this
        amount in settings). Goal is {emrGoal}.
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Transactions
        </Link>
      </div>
    </React.Fragment>
  )
}

function BudgetCard({remainingBudget, budget, spent, status}) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>
        Remaining Budget{' '}
        <Button variant="contained" color="default" className={classes.button}>
          Spend
        </Button>
      </Title>
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
          View Transactions
        </Link>
      </div>
    </React.Fragment>
  )
}

function FreeMoneyCard({freeMoney}) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>
        Spludge Money{' '}
        <Button variant="contained" color="default" className={classes.button}>
          Spludge
        </Button>
      </Title>
      <Typography component="p" variant="h4">
        {freeMoney}
      </Typography>
      <Typography color="textSecondary" className={classes.cardContext}>
        Spludge! You deserve it. Spend it freely. Make mermories out it.
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Spludges
        </Link>
      </div>
    </React.Fragment>
  )
}

export {EmrFundCard, FreeMoneyCard, BudgetCard}
