import * as React from 'react'
import {clientFacade as client} from '../utils/api-client'
import currency from 'currency.js'
import {CreateNextPayPeriod} from '../components/createNextPeriod'

import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'

import {
  EmrFundCard,
  FreeMoneyCard,
  BudgetCard,
} from '../components/balanceCardLib'
import {
  NormalSpendingSheets,
  FixedSpendingSheet,
  GoalSpendingSheet,
} from '../components/spendingSheetLib'
import {
  AddSpendingFormDialog,
  EmrFundFormDialog,
  FreeMoneyFormDialog,
  FixedSpendingFormDialog,
  CreateGoalFormDialog,
  CreateNextPeriodFormDialog,
  EditPayPeriodFormDialog,
} from '../components/modal'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}))

function Dashboard({
  data,
  dispatch,
  toggleCreatePayPeriodModal,
  doCloseCreatePayPeriodModal,
  toggleEditPPModal,
  doCloseEditPPModal,
}) {
  const {username, currentSpendings, token} = data

  const currentPayPeriod = data.payPeriods[data.payPeriods.length - 1]

  const filterSpendingsByType = filter(currentSpendings)
  const normalSpendings = filterSpendingsByType('normal')
  const fixedSpendings = filterSpendingsByType('fixed')
  const emrSpendings = filterSpendingsByType('emr')
  const freeSpendings = filterSpendingsByType('free')
  const goalSpendings = filterSpendingsByType('goal')

  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  const [toggleAddSpendingModal, setAddSpendingModal] = React.useState(false)
  const [toggleUseEmrFundModal, setUseEmrFundModal] = React.useState(false)
  const [toggleUseFreeMoneyModal, setUseFreeMoneyModal] = React.useState(false)
  const [
    toggleAddFixedSpendingModal,
    setAddFixedSpendingModal,
  ] = React.useState(false)
  const [toggleCreateGoalModal, setCreateGoalModal] = React.useState(false)
  const [carryOverGoals, setCarryOverGoals] = React.useState(
    goalSpendings.map(x => x._id),
  )
  const [carryOverFixed, setCarryOverFixed] = React.useState(
    fixedSpendings.map(x => x._id),
  )
  const [spendingToEdit, setSpendingToEdit] = React.useState(null)

  if (data.payPeriods.length === 0)
    return <CreateIntialPayPeriod data={data} dispatch={dispatch} />

  const avgPay = data.payPeriods
    .map(x => currency(x.pay).value)
    .reduce((a, b) => currency(a).add(b), 0)
    .divide(data.payPeriods.length).value
  const emrGoal = currency(avgPay)
    .multiply(data.numberOfPayPeriodPerMonth)
    .multiply(data.emrtype).value

  const emrCurrentBalance = currency(data.emrRemainingBalance)
    .add(data.emrCommitmentAmount)
    .subtract(sumOf(emrSpendings)).value

  const emrCommitment =
    emrCurrentBalance >= emrGoal ? '0.00' : data.emrCommitmentAmount
  const budget = currency(currentPayPeriod.pay)
    .subtract(emrCommitment)
    .subtract(
      currency(sumOf(fixedSpendings)).divide(data.numberOfPayPeriodPerMonth)
        .value,
    )
    .subtract(sumOf(goalSpendings)).value
  const remainingBudget = currency(budget).subtract(sumOf(normalSpendings))
    .value
  const previousPayPeriods = data.payPeriods.slice(
    0,
    data.payPeriods.length - 1,
  )

  const surplus =
    previousPayPeriods.length !== 0
      ? previousPayPeriods
          .map(x => x.remainingBudget)
          .reduce((a, b) => currency(a).add(b).value, 0)
      : 0

  const freeMoney = currency(surplus).subtract(sumOf(freeSpendings)).format()
  const actualRemainingBudget = currency(remainingBudget)
    .subtract(sumOf(freeSpendings))
    .format()

  function sortDatesLatestFirst(a, b) {
    const prev = new Date(a.createdAt)
    const next = new Date(b.createdAt)
    return next - prev
  }
  const regularSpendings = [
    ...normalSpendings,
    ...freeSpendings,
    ...emrSpendings,
  ].sort(sortDatesLatestFirst)

  const doOpenUseEmrFundModal = () => {
    setUseEmrFundModal(true)
  }

  const doOpenFreeMoneyModal = () => {
    setUseFreeMoneyModal(true)
  }

  const doOpenAddFixedSpendingModal = () => {
    setAddFixedSpendingModal(true)
  }

  const doOpenCreateGoalModal = () => {
    setCreateGoalModal(true)
  }

  const doCloseFreeMoneyModal = () => {
    setUseFreeMoneyModal(false)
  }

  const doCloseAddFixedSpendingModal = () => {
    setAddFixedSpendingModal(false)
  }

  const doCloseCreateGoalModal = () => {
    setCreateGoalModal(false)
  }

  const doToggleModal = setToggle => {
    const toggleHanlder = prevState => {
      const isClosing = prevState ? true : false
      if (isClosing && spendingToEdit !== null) setSpendingToEdit(null)
      return !prevState
    }
    setToggle(toggleHanlder)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Budget Card */}
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper}>
                <BudgetCard
                  spent={formatWithCurrency(sumOf(normalSpendings))}
                  remainingBudget={formatWithCurrency(remainingBudget)}
                  budget={formatWithCurrency(budget)}
                  doToggleModal={() => doToggleModal(setAddSpendingModal)}
                  setAddSpendingModal={setAddSpendingModal}
                  status={calculateStatus(sumOf(normalSpendings), budget)}
                />
              </Paper>
            </Grid>
            {/* Emergency Fund */}
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper}>
                <EmrFundCard
                  emrCommitment={formatWithCurrency(emrCommitment)}
                  emrGoal={formatWithCurrency(emrGoal)}
                  doToggleModal={() => doToggleModal(setUseEmrFundModal)}
                  setUseEmrFundModal={setUseEmrFundModal}
                  emrCurrentBalance={formatWithCurrency(emrCurrentBalance)}
                  status={calculateStatus(emrCurrentBalance, emrGoal)}
                />
              </Paper>
            </Grid>
            {/* Spludge Money */}
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper}>
                <FreeMoneyCard
                  doToggleModal={() => doToggleModal(setUseFreeMoneyModal)}
                  freeMoney={formatWithCurrency(freeMoney)}
                />
              </Paper>
            </Grid>
            {/* Spendings */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <NormalSpendingSheets
                  setSpendingToEdit={setSpendingToEdit}
                  spendings={regularSpendings}
                  doToggleModal={doToggleModal}
                  setAddSpendingModal={setAddSpendingModal}
                  setUseEmrFundModal={setUseEmrFundModal}
                  setUseFreeMoneyModal={setUseFreeMoneyModal}
                />
              </Paper>
            </Grid>
            {/* Bills */}
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <FixedSpendingSheet
                  doOpenAddFixedSpendingModal={doOpenAddFixedSpendingModal}
                  setSpendingToEdit={setSpendingToEdit}
                  spendings={fixedSpendings}
                  numberOfPayPeriodPerMonth={data.numberOfPayPeriodPerMonth}
                  doOpenModal={doOpenAddFixedSpendingModal}
                />
              </Paper>
            </Grid>
            {/* Goals */}
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <GoalSpendingSheet
                  setSpendingToEdit={setSpendingToEdit}
                  spendings={goalSpendings}
                  doOpenModal={doOpenCreateGoalModal}
                />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
      {toggleAddSpendingModal && (
        <AddSpendingFormDialog
          doToggleModal={() => doToggleModal(setAddSpendingModal)}
          spendingToEdit={spendingToEdit}
          modalToggle={toggleAddSpendingModal}
          setSpendingToEdit={setSpendingToEdit}
          data={data}
          dispatch={dispatch}
        />
      )}
      {toggleUseEmrFundModal && (
        <EmrFundFormDialog
          doToggleModal={() => doToggleModal(setUseEmrFundModal)}
          spendingToEdit={spendingToEdit}
          modalToggle={toggleUseEmrFundModal}
          setSpendingToEdit={setSpendingToEdit}
          setUseEmrFundModal={setUseEmrFundModal}
          data={data}
          dispatch={dispatch}
        />
      )}
      {toggleUseFreeMoneyModal && (
        <FreeMoneyFormDialog
          doToggleModal={() => doToggleModal(setUseFreeMoneyModal)}
          spendingToEdit={spendingToEdit}
          setSpendingToEdit={setSpendingToEdit}
          modalToggle={toggleUseFreeMoneyModal}
          doCloseModal={doCloseFreeMoneyModal}
          data={data}
          dispatch={dispatch}
        />
      )}
      {toggleAddFixedSpendingModal && (
        <FixedSpendingFormDialog
          spendingToEdit={spendingToEdit}
          setSpendingToEdit={setSpendingToEdit}
          doToggleModal={() => doToggleModal(setAddFixedSpendingModal)}
          setCarryOverFixed={setCarryOverFixed}
          modalToggle={toggleAddFixedSpendingModal}
          doCloseModal={doCloseAddFixedSpendingModal}
          data={data}
          dispatch={dispatch}
        />
      )}
      {toggleCreateGoalModal && (
        <CreateGoalFormDialog
          spendingToEdit={spendingToEdit}
          setSpendingToEdit={setSpendingToEdit}
          doToggleModal={() => doToggleModal(setCreateGoalModal)}
          setCarryOverGoals={setCarryOverGoals}
          modalToggle={toggleCreateGoalModal}
          doCloseModal={doCloseCreateGoalModal}
          data={data}
          dispatch={dispatch}
        />
      )}
      <CreateNextPeriodFormDialog
        setCarryOverFixed={setCarryOverFixed}
        setCarryOverGoals={setCarryOverGoals}
        carryOverGoals={carryOverGoals}
        carryOverFixed={carryOverFixed}
        modalToggle={toggleCreatePayPeriodModal}
        doCloseModal={doCloseCreatePayPeriodModal}
        data={data}
        fixedSpendings={fixedSpendings}
        goalSpendings={goalSpendings}
        remainingBudget={actualRemainingBudget}
        prevPayPeriodID={currentPayPeriod._id}
        emrCurrentBalance={emrCurrentBalance}
      />
      <EditPayPeriodFormDialog
        modalToggle={toggleEditPPModal}
        doCloseModal={doCloseEditPPModal}
        data={data}
        currentPayPeriod={currentPayPeriod}
      />
    </div>
  )
}

function CreateIntialPayPeriod({data, dispatch}) {
  // TODO: normalize the input into the right format of type string
  const [form, setForm] = React.useState({pay: '0.00'})

  const onChange = e => {
    const target = e.target
    setForm({...form, [target.name]: target.value})
  }
  const onSubmit = event => {
    event.preventDefault()
    client('pay-period/create-initial-pay-period', {
      data: {pay: form.pay},
      token: data.token,
    }).then(res => {
      return dispatch({type: 'add-payPeriod', payload: res})
    })
  }
  return (
    <>
      <h1>Create First Pay Period</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={form.pay} name="pay" onChange={onChange} />
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

function List({list}) {
  const renderListByType = list.map(x => {
    if (x.type === 'goal')
      return (
        <li key={x._id}>
          {x.description} commitment: {x.amount} balance: {x.goalBalance}{' '}
          TotalGoal: {x.goalAmount}
        </li>
      )

    return (
      <li key={x._id}>
        {x.description} amount: {x.amount}
      </li>
    )
  })

  return <ol>{renderListByType}</ol>
}
function AddSpending({data, dispatch}) {
  const [spending, setSpending] = React.useState({
    description: '',
    amount: 0,
    type: 'normal',
    payPeriodId: data.payPeriods[data.payPeriods.length - 1]._id,
    goalAmount: '',
  })

  const onChange = e => {
    const target = e.target
    setSpending({...spending, [target.name]: target.value})
  }

  const onSelectTypeHandler = e => {
    setSpending({...spending, type: e.target.value})
  }

  const onSubmit = e => {
    e.preventDefault()
    let body = {...spending}
    if (spending.type === 'goal') {
      body = {
        ...body,
        goalBalance: spending.amount,
        goalAmount: spending.goalAmount,
      }
    }

    client('spending/create-spending', {
      data: body,
      token: data.token,
    })
      .then(res => dispatch({type: 'add-spending', payload: res}))
      .catch(console.log) // TODO: handle error to render error message
  }

  const renderFeildsForGoals = () => (
    <input
      type="text"
      name="goalAmount"
      onChange={onChange}
      value={spending.goalAmount}
    />
  )
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="description"
        onChange={onChange}
        value={spending.description}
      />
      <input
        type="number"
        name="amount"
        onChange={onChange}
        value={spending.amount}
      />
      <select value={spending.type} onChange={onSelectTypeHandler}>
        <option value="normal">normal</option>
        <option value="free">free</option>
        <option value="emr">emr</option>
        <option value="goal">goal</option>
        <option value="fixed">fixed</option>
      </select>
      {spending.type === 'goal' && renderFeildsForGoals()}
      <button type="sumibt">Add</button>
    </form>
  )
}

const Dashboard2 = ({data, dispatch}) => {
  if (data.payPeriods.length === 0)
    return <CreateIntialPayPeriod data={data} dispatch={dispatch} />

  const {username, currentSpendings, token} = data

  const currentPayPeriod = data.payPeriods[data.payPeriods.length - 1]

  const filterSpendingsByType = filter(currentSpendings)
  const normalSpendings = filterSpendingsByType('normal')
  const fixedSpendings = filterSpendingsByType('fixed')
  const emrSpendings = filterSpendingsByType('emr')
  const freeSpendings = filterSpendingsByType('free')
  const goalSpendings = filterSpendingsByType('goal')

  const avgPay = data.payPeriods
    .map(x => currency(x.pay).value)
    .reduce((a, b) => currency(a).add(b), 0)
    .divide(data.payPeriods.length).value
  const emrGoal = currency(avgPay)
    .multiply(data.numberOfPayPeriodPerMonth)
    .multiply(data.emrtype).value

  const sumOf = spendings => {
    if (spendings.length === 0) return 0
    return spendings
      .map(x => {
        if (
          x.type === 'goal' &&
          parseInt(x.goalBalance) >= parseInt(x.goalAmount)
        )
          return 0
        return currency(x.amount).value
      })
      .reduce((a, b) => currency(a).add(b).value, 0)
  }

  const emrCurrentBalance = currency(data.emrRemainingBalance)
    .add(data.emrCommitmentAmount)
    .subtract(sumOf(emrSpendings)).value

  const emrCommitment =
    emrCurrentBalance >= emrGoal ? '0.00' : data.emrCommitmentAmount
  const budget = currency(currentPayPeriod.pay)
    .subtract(emrCommitment)
    .subtract(
      currency(sumOf(fixedSpendings)).divide(data.numberOfPayPeriodPerMonth)
        .value,
    )
    .subtract(sumOf(goalSpendings)).value
  const remainingBudget = currency(budget).subtract(sumOf(normalSpendings))
    .value
  const previousPayPeriods = data.payPeriods.slice(
    0,
    data.payPeriods.length - 1,
  )

  const surplus =
    previousPayPeriods.length !== 0
      ? previousPayPeriods
          .map(x => x.remainingBudget)
          .reduce((a, b) => currency(a).add(b).value, 0)
      : 0

  const freeMoney = currency(surplus).subtract(sumOf(freeSpendings)).format()
  const actualRemainingBudget = currency(remainingBudget)
    .subtract(sumOf(freeSpendings))
    .format()
  return (
    <>
      <button>Create Next Period</button>
      <CreateNextPayPeriod
        data={data}
        fixedSpendings={fixedSpendings}
        goalSpendings={goalSpendings}
        remainingBudget={actualRemainingBudget}
        prevPayPeriodID={currentPayPeriod._id}
        emrCurrentBalance={emrCurrentBalance}
      />
      <h1>Dashboard</h1>
      <p>Username: {username}</p>
      <p>Add Spending by type: </p>
      <AddSpending data={data} dispatch={dispatch} />
      <h1>EMR Fund Status: </h1>
      <p>
        {emrCurrentBalance}/{emrGoal}
      </p>
      <List list={emrSpendings} />
      <span>Use EMR Fund</span> | <span>View Usage</span>
      <hr />
      <h1>Free Money: {freeMoney}</h1>
      <List list={freeSpendings} />
      <span>Use EMR Fund</span> | <span>View Usage</span>
      <hr />
      <h1>Current Budget: </h1>
      <p>
        {remainingBudget} / {budget}
      </p>
      <List list={normalSpendings} />
      <h1>Fixed Spendings: </h1>
      <span>(Convered to Monthly)</span>
      <List list={fixedSpendings} />
      <hr />
      <h1>Goals: </h1>
      <List list={goalSpendings} />
      <hr />
    </>
  )
}

// util functions
function filter(spendings) {
  return type => spendings.filter(x => x.type === type)
}

function sumOf(spendings) {
  if (spendings.length === 0) return 0
  return spendings
    .map(x => {
      if (
        x.type === 'goal' &&
        parseInt(x.goalBalance) >= parseInt(x.goalAmount)
      )
        return 0
      return currency(x.amount).value
    })
    .reduce((a, b) => currency(a).add(b).value, 0)
}

function formatWithCurrency(value) {
  return currency(value).format()
}

function calculateStatus(x, y) {
  return currency(x).divide(y).multiply(100).value
}

export {Dashboard, Dashboard2}
