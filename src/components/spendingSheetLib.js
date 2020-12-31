import React from 'react'
import Link from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

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
  button: {
    margin: theme.spacing(1),
  },
}))

function NormalSpendingSheets({
  spendings,
  setSpendingToEdit,
  doOpenAddSpendingModal,
  doOpenUseEmrFundModal,
  doOpenFreeMoneyModal,
}) {
  const classes = useStyles()
  const doEdit = async spending => {
    await setSpendingToEdit(spending)
    switch (spending.type) {
      case 'emr':
        doOpenUseEmrFundModal()
        break
      case 'free':
        doOpenFreeMoneyModal()
      default:
        doOpenAddSpendingModal()
        break
    }
  }
  return (
    <React.Fragment>
      <Title>Spendings</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Posted Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Special Note</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {spendings.map(spending => (
            <TableRow
              key={spending._id}
              hover={true}
              onClick={() => doEdit(spending)}
            >
              <TableCell>{formatIsoDateString(spending.createdAt)}</TableCell>
              <TableCell>{spending.description}</TableCell>
              <TableCell>
                {spending.type === 'emr'
                  ? 'Emergency'
                  : spending.type === 'free'
                  ? 'Spludge'
                  : null}
              </TableCell>
              <TableCell align="right">
                {formatWithCurrency(spending.amount)}
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

function FixedSpendingSheet({
  spendings,
  setSpendingToEdit,
  numberOfPayPeriodPerMonth,
  doOpenAddFixedSpendingModal,
  doOpenModal,
}) {
  const classes = useStyles()
  const doEdit = async spending => {
    await setSpendingToEdit(spending)
    doOpenAddFixedSpendingModal()
  }
  return (
    <React.Fragment>
      <Title>
        Fixed Spendings( e.g. Bills ){' '}
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={doOpenModal}
        >
          Add
        </Button>
      </Title>
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
          {spendings.map(spending => (
            <TableRow key={spending._id} hover onClick={() => doEdit(spending)}>
              <TableCell>{formatIsoDateString(spending.createdAt)}</TableCell>
              <TableCell>{spending.description}</TableCell>
              <TableCell align="right">
                {formatWithCurrency(spending.amount)}
              </TableCell>
              <TableCell align="right">
                {formatWithCurrency(
                  convertMontlyValueToPerPeriod(
                    spending.amount,
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

function GoalSpendingSheet({spendings, setSpendingToEdit, doOpenModal}) {
  const classes = useStyles()
  const doEdit = async spending => {
    console.log(spending)
    await setSpendingToEdit(spending)
    doOpenModal()
  }
  return (
    <React.Fragment>
      <Title>
        Goals
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={doOpenModal}
        >
          Create
        </Button>
      </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Progress(%)</TableCell>
            <TableCell align="right">Commitment per period</TableCell>
            <TableCell align="right">Goal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {spendings.map(spending => (
            <TableRow key={spending._id} hover onClick={() => doEdit(spending)}>
              <TableCell>{spending.description}</TableCell>
              <TableCell>
                <LinearProgressWithLabel
                  value={calculateStatus(
                    spending.goalBalance,
                    spending.goalAmount,
                  )}
                />
              </TableCell>
              <TableCell align="right">
                {formatWithCurrency(spending.amount)}
              </TableCell>
              <TableCell align="right">
                {formatWithCurrency(spending.goalAmount)}
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
