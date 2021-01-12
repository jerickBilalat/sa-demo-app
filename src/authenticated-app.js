import * as React from 'react'
import {Link as RouterLink, Routes, Route, useMatch} from 'react-router-dom'

import {About} from './screens/about'
import {Dashboard, Dashboard2} from './screens/dashboard'
import {NotFound} from './screens/notFound'
import {UserSettings} from './screens/userSettings'

import Typography from '@material-ui/core/Typography'
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
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
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

const AuthenticatedApp = ({user, logout}) => {
  const [userData, dispatch] = React.useReducer(userDataReducer, user)
  const [toggleCreatePayPeriodModal, setCreatePayPeriodModal] = React.useState(
    false,
  )
  const [toggleEditPPModal, setEditPPModal] = React.useState(false)

  const classes = useStyles()
  const sections = [
    {title: 'Dashboard', url: '/'},
    {title: 'About', url: '/about'},
    {title: 'Settings', url: '/user-settigs'},
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
        {sections.map(section => {
          return (
            <Link
              color="inherit"
              component={RouterLink}
              noWrap
              key={section.title}
              variant="body2"
              to={section.url}
              className={classes.toolbarLink}
            >
              {section.title}
            </Link>
          )
        })}

        <Link>
          <Button variant="outlined" onClick={logout} size="small">
            Log out
          </Button>
        </Link>
      </Toolbar>
      {userData.payPeriods.length > 0 && (
        <Toolbar variant="dense" className={classes.toolbarSecondary}>
          <Grid container item justify="space-between">
            <Button
              color="default"
              variant="outlined"
              size="small"
              startIcon={<EditIcon />}
              onClick={doOpenEditPPModal}
            >
              Edit Period
            </Button>
            <Button
              color="default"
              variant="outlined"
              size="small"
              onClick={doOpenCreatePayPeriodModal}
              endIcon={<NavigateNextIcon />}
            >
              Next Period
            </Button>
          </Grid>
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
        <Route path="/user-settings" element={<UserSettings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export {AuthenticatedApp}
