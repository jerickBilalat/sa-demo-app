import * as React from 'react'
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
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

function userDataReducer(state, action) {
  switch (action.type) {
    case 'add-payPeriod':
      return {...state, payPeriods: [...state.payPeriods, action.payload]}
    case 'update-payPeriod':
      const payPeriods = state.payPeriods.filter(
        x => x._id !== action.payload._id,
      )
      return {...state, payPeriods: [...payPeriods, action.payload]}
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
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  button: {
    margin: theme.spacing(0.5),
  },
}))

const mockUserState = {
  emrtype: 6,
  emrRemainingBalance: '$50.00',
  averagePayPerPeriod: '0',
  numberOfPayPeriodPerMonth: 2,
  emrCommitmentAmount: '50',
  userID: '603276bb4f02f09a95d3486d',
  username: 'johndoe',
  currentSpendings: [
    {
      refPayPeriods: ['603276bb4f02f09a95d3486e', '6032806a4f02f09a95d34876'],
      _id: '6032801c4f02f09a95d34874',
      description: 'phone',
      amount: '45',
      type: 'fixed',
      refUser: '603276bb4f02f09a95d3486d',
      createdAt: '2021-02-21T15:45:32.885Z',
      updatedAt: '2021-02-21T15:46:50.979Z',
      __v: 0,
    },
    {
      refPayPeriods: ['603276bb4f02f09a95d3486e', '6032806a4f02f09a95d34876'],
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
      remainingBudget: '$477.50',
      _id: '603276bb4f02f09a95d3486e',
      refUser: '603276bb4f02f09a95d3486d',
      createdAt: '2021-02-21T15:05:31.357Z',
      updatedAt: '2021-02-21T15:46:50.975Z',
      __v: 0,
    },
    {
      pay: '1500',
      remainingBudget: '0',
      _id: '6032806a4f02f09a95d34876',
      refUser: '603276bb4f02f09a95d3486d',
      createdAt: '2021-02-21T15:46:50.972Z',
      updatedAt: '2021-02-21T15:46:50.972Z',
      __v: 0,
    },
  ],
}

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
      amount: '45',
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
        <Toolbar component="nav" className={classes.toolbar}>
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
