import React from 'react'
import Link from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import {LinearProgressWithLabel} from './lib'
import {
  formatWithCurrency,
  formatIsoDateString,
  convertMontlyValueToPerPeriod,
  calculateStatus,
} from './utils'

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
  seeMore: {
    marginTop: theme.spacing(3),
  },
}))

function NormalSpendingSheets({spendings}) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Spendings</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Posted Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {spendings.map(row => (
            <TableRow key={row._id}>
              <TableCell>{formatIsoDateString(row.updatedAt)}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right">
                {formatWithCurrency(row.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  )
}

function FixedSpendingSheet({spendings, numberOfPayPeriodPerMonth}) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Fixed Spendings( e.g. Bills )</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Posted</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Cost per Month</TableCell>
            <TableCell align="right">Cost per Period</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {spendings.map(row => (
            <TableRow key={row._id}>
              <TableCell>{formatIsoDateString(row.updatedAt)}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right">
                {formatWithCurrency(row.amount)}
              </TableCell>
              <TableCell align="right">
                {formatWithCurrency(
                  convertMontlyValueToPerPeriod(
                    row.amount,
                    numberOfPayPeriodPerMonth,
                  ),
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  )
}

function GoalSpendingSheet({spendings}) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Goals</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Status percentage</TableCell>
            <TableCell>Commitment</TableCell>
            <TableCell align="right">Goal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {spendings.map(row => (
            <TableRow key={row._id}>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                <LinearProgressWithLabel
                  value={calculateStatus(row.goalBalance, row.goalAmount)}
                />
              </TableCell>
              <TableCell align="right">
                {formatWithCurrency(row.amount)}
              </TableCell>
              <TableCell align="right">
                {formatWithCurrency(row.goalAmount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  )
}

export {NormalSpendingSheets, FixedSpendingSheet, GoalSpendingSheet}
