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

function userDataReducer(state, action) {
  switch (action.type) {
    case 'add-payPeriod':
      return {...state, payPeriods: [...state.payPeriods, action.payload]}
    case 'add-spending':
      return {
        ...state,
        currentSpendings: [...state.currentSpendings, action.payload],
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
}))

const AuthenticatedApp = ({user, logout}) => {
  const [userData, dispatch] = React.useReducer(userDataReducer, user)
  const classes = useStyles()
  const sections = [
    {title: 'Dashboard', url: '/'},
    {title: 'About', url: '/about'},
    {title: 'Settings', url: '/user-settigs'},
  ]
  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Spending Awareness
        </Typography>
        <Button variant="outlined" onClick={logout} size="small">
          Log out
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
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
      </Toolbar>
      <Routes>
        <Route
          path="/"
          element={<Dashboard data={userData} dispatch={dispatch} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/user-settings" element={<UserSettings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export {AuthenticatedApp}
