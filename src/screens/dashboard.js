import * as React from 'react'
import {CreateIntialPayPeriod} from '../components/cards'
import {derivedUserData} from '../utils/lib'

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
  SpendingFormDialog,
  CreateNextPeriodFormDialog,
  EditPayPeriodFormDialog,
  EditUserPreferenceDialog,
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
  toggleEditUPModal,
  doCloseEditUPModal,
}) {
  const {
    fixedSpendings,
    goalSpendings,
    currentPayPeriod,
    emrGoal,
    emrStatus,
    emrCurrentBalance,
    emrCommitment,
    remainingBudget,
    budget,
    budgetStatus,
    budgetSpent,
    freeMoney,
    actualRemainingBudget,
    regularSpendings,
    formatWithCurrency,
  } = derivedUserData(data)

  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  /**
   * COMPONENT STATE
   */
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

  /**
   * if pay < 0
   * then Render Create Initial Period Form
   */
  if (parseInt(data.payPeriods[data.payPeriods.length - 1].pay) < 1)
    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Create initila payPeriod card */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <CreateIntialPayPeriod data={data} dispatch={dispatch} />
                </Paper>
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    )

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
                  spent={formatWithCurrency(budgetSpent)}
                  remainingBudget={formatWithCurrency(remainingBudget)}
                  budget={formatWithCurrency(budget)}
                  doToggleModal={() => doToggleModal(setAddSpendingModal)}
                  setAddSpendingModal={setAddSpendingModal}
                  status={budgetStatus}
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
                  status={emrStatus}
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
                  setSpendingToEdit={setSpendingToEdit}
                  spendings={fixedSpendings}
                  numberOfPayPeriodPerMonth={data.numberOfPayPeriodPerMonth}
                  doToggleModal={() => doToggleModal(setAddFixedSpendingModal)}
                />
              </Paper>
            </Grid>
            {/* Goals */}
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <GoalSpendingSheet
                  setSpendingToEdit={setSpendingToEdit}
                  spendings={goalSpendings}
                  doToggleModal={() => doToggleModal(setCreateGoalModal)}
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
        <SpendingFormDialog
          userData={data}
          doToggleModal={() => doToggleModal(setAddSpendingModal)}
          spendingToEdit={spendingToEdit}
          modalToggle={toggleAddSpendingModal}
          dispatch={dispatch}
          setSpendingToEdit={setSpendingToEdit}
          currentPayPeriodID={currentPayPeriod._id}
          modalTitle="Budget Spending"
          modalContentText="Spend wisely."
        />
      )}
      {toggleUseEmrFundModal && (
        <SpendingFormDialog
          userData={data}
          doToggleModal={() => doToggleModal(setUseEmrFundModal)}
          spendingToEdit={spendingToEdit}
          modalToggle={toggleUseEmrFundModal}
          setSpendingToEdit={setSpendingToEdit}
          setUseEmrFundModal={setUseEmrFundModal}
          currentPayPeriodID={currentPayPeriod._id}
          dispatch={dispatch}
          modalTitle="Emergency Fund Spending"
          type="emr"
        />
      )}
      {toggleUseFreeMoneyModal && (
        <SpendingFormDialog
          userData={data}
          doToggleModal={() => doToggleModal(setUseFreeMoneyModal)}
          spendingToEdit={spendingToEdit}
          setSpendingToEdit={setSpendingToEdit}
          modalToggle={toggleUseFreeMoneyModal}
          dispatch={dispatch}
          currentPayPeriodID={currentPayPeriod._id}
          modalTitle="Spludge Fund Spending"
          type="free"
        />
      )}
      {toggleAddFixedSpendingModal && (
        <SpendingFormDialog
          userData={data}
          spendingToEdit={spendingToEdit}
          setSpendingToEdit={setSpendingToEdit}
          doToggleModal={() => doToggleModal(setAddFixedSpendingModal)}
          setCarryOverFixed={setCarryOverFixed}
          modalToggle={toggleAddFixedSpendingModal}
          dispatch={dispatch}
          currentPayPeriodID={currentPayPeriod._id}
          modalTitle="Fixed Spending"
          type="fixed"
        />
      )}
      {toggleCreateGoalModal && (
        <SpendingFormDialog
          userData={data}
          spendingToEdit={spendingToEdit}
          setSpendingToEdit={setSpendingToEdit}
          doToggleModal={() => doToggleModal(setCreateGoalModal)}
          setCarryOverGoals={setCarryOverGoals}
          modalToggle={toggleCreateGoalModal}
          dispatch={dispatch}
          currentPayPeriodID={currentPayPeriod._id}
          modalTitle="Goal Spending"
          type="goal"
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
        dispatch={dispatch}
      />
      <EditPayPeriodFormDialog
        modalToggle={toggleEditPPModal}
        dispatch={dispatch}
        doCloseModal={doCloseEditPPModal}
        data={data}
        currentPayPeriod={currentPayPeriod}
      />
      <EditUserPreferenceDialog
        modalToggle={toggleEditUPModal}
        dispatch={dispatch}
        doCloseModal={doCloseEditUPModal}
        userData={data}
      />
    </div>
  )
}

export {Dashboard}
