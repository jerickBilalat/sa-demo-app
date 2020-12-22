import React from 'react'
import Link from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {LinearProgressWithLabel} from './lib'

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

function EmrFundCard() {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Emergency Fund</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <LinearProgressWithLabel value={10} />
      <Typography color="textSecondary" className={classes.cardContext}>
        $100 is transfered to this fund every period <br />
        (see user settings to change this amount)
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

function BudgetCard() {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Remaining Budget</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <LinearProgressWithLabel value={10} />
      <Typography color="textSecondary" className={classes.cardContext}>
        You have spent $400 out of your $1000 budget for this period. Please
        spend wisely.
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
