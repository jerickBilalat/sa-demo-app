import * as React from 'react'
import {v4 as uuidv4} from 'uuid'
import currency from 'currency.js'
import {
  Link as RouterLink,
  Routes,
  Route,
  useMatch,
  BrowserRouter,
} from 'react-router-dom'

import {About} from './screens/about'
import {Dashboard} from './screens/dashboard'
import {NotFound} from './screens/notFound'
import {UserSettings} from './screens/userSettings'

import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Toolbar from '@material-ui/core/Toolbar'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import EditIcon from '@material-ui/icons/Edit'
import SettinsIcon from '@material-ui/icons/Settings'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

function userDataReducer(state, action) {
  switch (action.type) {
    case 'update-user-settings':
      const {
        emrtype,
        emrRemainingBalance,
        numberOfPayPeriodPerMonth,
        emrCommitmentAmount,
      } = action.payload

      const newState = {
        ...state,
        emrtype,
        emrCommitmentAmount,
        emrRemainingBalance,
        numberOfPayPeriodPerMonth,
      }
      return newState
    case 'add-payPeriod':
      return {...state, payPeriods: [...state.payPeriods, action.payload]}
    case 'update-payPeriod':
      const payPeriods = state.payPeriods.filter(
        x => x._id !== action.payload._id,
      )
      return {...state, payPeriods: [...payPeriods, action.payload]}
    case 'edit-period':
      const periods = state.payPeriods.filter(
        x => x._id !== action.payload.payPeriodID,
      )
      const modifiedPeriod = {
        ...state.payPeriods.filter(
          x => x._id === action.payload.payPeriodID,
        )[0],
        pay: action.payload.pay,
      }
      return {...state, payPeriods: [...periods, modifiedPeriod]}
    case 'create-next-period':
      console.log(action.payload)
      console.log(state)
      const {
        pay,
        remainingBudget,
        continuedFixedSpendings,
        continuedGoals,
      } = action.payload
      const nextPayPeriod = {
        _id: uuidv4(),
        pay,
        remainingBudget,
        refUser: state.userID,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      const carryOverFixedSpendings = [
        ...state.currentSpendings
          .filter(spending => {
            const spendingId = spending._id
            if (continuedFixedSpendings.includes(spendingId)) {
              return true
            }
          })
          .map(spending => {
            return {
              ...spending,
              refPayPeriods: [...spending.refPayPeriods, nextPayPeriod._id],
            }
          }),
      ]
      const carryOverGoalSpendings = [
        ...state.currentSpendings
          .filter(spending => {
            const spendingId = spending._id
            if (continuedGoals.includes(spendingId)) {
              return true
            }
          })
          .map(spending => {
            return {
              ...spending,
              refPayPeriods: [...spending.refPayPeriods, nextPayPeriod._id],
              goalBalance: currency(spending.amount).add(spending.goalBalance),
            }
          }),
      ]
      return {
        ...state,
        emrRemainingBalance: currency(state.emrRemainingBalance)
          .add(state.emrCommitmentAmount)
          .format(),
        payPeriods: [...state.payPeriods, nextPayPeriod],
        currentSpendings: [
          ...carryOverFixedSpendings,
          ...carryOverGoalSpendings,
        ],
      }
    case 'add-spending':
      const newSpendingId = action.payload._id
      let currentSpendings = state.currentSpendings
      if (currentSpendings.map(x => x._id).includes(newSpendingId)) {
        currentSpendings = state.currentSpendings.filter(
          x => x._id !== newSpendingId,
        )
      }
      return {
        ...state,
        currentSpendings: [...currentSpendings, action.payload],
      }
    case 'delete-spending':
      const deletedSpendingId = action.payload._id
      return {
        ...state,
        currentSpendings: [
          ...state.currentSpendings.filter(x => x._id !== deletedSpendingId),
        ],
      }
    default:
      return state
  }
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: 'flex-end',
    overflowX: 'auto',
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'center',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  button: {
    margin: theme.spacing(0.5),
  },
}))

const defaultUserState = {
  emrtype: 6,
  emrRemainingBalance: '0',
  averagePayPerPeriod: '0',
  numberOfPayPeriodPerMonth: 2,
  emrCommitmentAmount: '50',
  userID: '603276bb4f02f09a95d3486d',
  username: 'johndoe',
  currentSpendings: [
    {
      refPayPeriods: ['603276bb4f02f09a95d3486e'],
      _id: '6032801c4f02f09a95d34874',
      description: 'phone',
      amount: '50',
      type: 'fixed',
      refUser: '603276bb4f02f09a95d3486d',
      createdAt: '2021-02-21T15:45:32.885Z',
      updatedAt: '2021-02-21T15:46:50.979Z',
      __v: 0,
    },
    {
      refPayPeriods: ['603276bb4f02f09a95d3486e'],
      _id: '603280324f02f09a95d34875',
      description: '2nd car',
      amount: '50',
      type: 'goal',
      goalBalance: '$5,100.00',
      goalAmount: '10000',
      refUser: '603276bb4f02f09a95d3486d',
      createdAt: '2021-02-21T15:45:54.869Z',
      updatedAt: '2021-02-21T15:46:50.992Z',
      __v: 0,
    },
  ],
  payPeriods: [
    {
      pay: '1600',
      remainingBudget: '0.00',
      _id: '603276bb4f02f09a95d3486e',
      refUser: '603276bb4f02f09a95d3486d',
      createdAt: '2021-02-21T15:05:31.357Z',
      updatedAt: '2021-02-21T15:46:50.975Z',
      __v: 0,
    },
  ],
}
const AuthenticatedApp = () => {
  const [userData, dispatch] = React.useReducer(
    userDataReducer,
    defaultUserState,
  )
  const [toggleCreatePayPeriodModal, setCreatePayPeriodModal] = React.useState(
    false,
  )
  const [toggleEditPPModal, setEditPPModal] = React.useState(false)

  const [toggleEditUPModal, setEditUPModal] = React.useState(true)

  const classes = useStyles()
  const isOnDashboard = useMatch('/')
  const sections = [
    {title: 'Dashboard', url: '/'},
    {title: 'About', url: '/about'},
    {title: 'Settings', url: '/user-settings'},
  ]
  const doOpenCreatePayPeriodModal = () => {
    setCreatePayPeriodModal(true)
  }
  const doCloseCreatePayPeriodModal = () => {
    setCreatePayPeriodModal(false)
  }
  const doOpenEditPPModal = () => {
    setEditPPModal(true)
  }
  const doCloseEditPPModal = () => {
    setEditPPModal(false)
  }
  const doOpenEditUPModal = () => {
    setEditUPModal(true)
  }
  const doCloseEditUPModal = () => {
    setEditUPModal(false)
  }
  return (
    <>
      <Toolbar component="nav" className={classes.toolbar}>
        <Link
          color="inherit"
          component={RouterLink}
          noWrap
          variant="body2"
          to={'/'}
          className={classes.toolbarLink}
          style={useMatch('/') && {textDecoration: 'underline'}}
        >
          Dashboard
        </Link>
        <Link
          color="inherit"
          component={RouterLink}
          noWrap
          variant="body2"
          to={'/about'}
          className={classes.toolbarLink}
          style={useMatch('/about') && {textDecoration: 'underline'}}
        >
          How it Works
        </Link>
      </Toolbar>
      {isOnDashboard && (
        <Toolbar component="nav" className={classes.toolbarSecondary}>
          <Link>
            <Button
              color="default"
              variant="outlined"
              size="small"
              startIcon={<SettinsIcon />}
              onClick={doOpenEditUPModal}
            >
              Settings
            </Button>
          </Link>
          <Link>
            <Button
              color="default"
              variant="outlined"
              size="small"
              startIcon={<EditIcon />}
              onClick={doOpenEditPPModal}
            >
              Edit Period
            </Button>
          </Link>
          <Link>
            <Button
              color="default"
              variant="outlined"
              size="small"
              onClick={doOpenCreatePayPeriodModal}
              endIcon={<NavigateNextIcon />}
            >
              Next Period
            </Button>
          </Link>
        </Toolbar>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              data={userData}
              dispatch={dispatch}
              toggleCreatePayPeriodModal={toggleCreatePayPeriodModal}
              doCloseCreatePayPeriodModal={doCloseCreatePayPeriodModal}
              doCloseEditPPModal={doCloseEditPPModal}
              toggleEditPPModal={toggleEditPPModal}
              toggleEditUPModal={toggleEditUPModal}
              doCloseEditUPModal={doCloseEditUPModal}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export {AuthenticatedApp}
