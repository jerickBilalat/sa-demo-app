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

function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  )
}

// Generate Order Data
function createData(id, date, name, amount) {
  return {id, date, name, amount}
}

const normalSpendings = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 212.79),
]

function preventDefault(event) {
  event.preventDefault()
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}))

function NormalSpendingSheets() {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Spendings</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Transaction Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {normalSpendings.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
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

const fixedSpendings = [
  createData(0, '16 Mar, 2019', 'Elvisfhlshdfsjlfjsdlkfjsdk Presley', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 212.79),
]

function FixedSpendingSheet() {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Fixed Spendings( e.g. Bills )</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date Added</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fixedSpendings.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
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

const goalSpendings = [
  createGoalSheetData(0, 'elvis esley', 30.0, 312.44),
  createGoalSheetData(1, 'Elvis Presley', 30.0, 312.44),
  createGoalSheetData(2, 'Elvis Presley', 30.0, 312.44),
]

function createGoalSheetData(id, description, commitmentAmount, goalAmount) {
  return {id, description, commitmentAmount, goalAmount}
}

function GoalSpendingSheet() {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Goals</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Status Commitment/Goal</TableCell>
            <TableCell>Commitment</TableCell>
            <TableCell align="right">Goal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {goalSpendings.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                <LinearProgressWithLabel value={10} />
              </TableCell>
              <TableCell align="right">{row.commitmentAmount}</TableCell>
              <TableCell align="right">{row.goalAmount}</TableCell>
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
