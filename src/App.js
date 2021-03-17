import * as React from 'react'
import {Link as RouterLink, Routes, Route, useMatch} from 'react-router-dom'

import {About} from './screens/about'
import {Dashboard} from './screens/dashboard'
import {NotFound} from './screens/notFound'
import appStateReducer from './utils/reducer'
import defaultState from './utils/defaultState'

import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Toolbar from '@material-ui/core/Toolbar'
import {makeStyles} from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import SettinsIcon from '@material-ui/icons/Settings'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

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

const AuthenticatedApp = () => {
  const [userData, dispatch] = React.useReducer(appStateReducer, defaultState)
  const [toggleCreatePayPeriodModal, setCreatePayPeriodModal] = React.useState(
    false,
  )
  const [toggleEditPPModal, setEditPPModal] = React.useState(false)

  const [toggleEditUPModal, setEditUPModal] = React.useState(false)

  const classes = useStyles()
  const isOnDashboard = useMatch('/dashboard')

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
          to={'/dashboard'}
          className={classes.toolbarLink}
          style={useMatch('/dashboard') && {textDecoration: 'underline'}}
        >
          Dashboard
        </Link>
        <Link
          color="inherit"
          component={RouterLink}
          noWrap
          variant="body2"
          to={'/'}
          className={classes.toolbarLink}
          style={useMatch('/') && {textDecoration: 'underline'}}
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
          path="/dashboard"
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
        <Route path="/" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export {AuthenticatedApp}
