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
  depositContext: {
    flex: 1,
  },
})

export default function Deposits() {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Emergency Fund</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <LinearProgressWithLabel value={10} />
      <Typography color="textSecondary" className={classes.depositContext}>
        you commited $100 transfered to this fund every pay period
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
