import * as React from 'react'
import {Link, Routes, Route, useMatch} from 'react-router-dom'
import {About} from './screens/about'
import {Dashboard} from './screens/dashboard'
import {NotFound} from './screens/notFound'
import {UserSettings} from './screens/userSettings'

function NavLink(props) {
  const match = useMatch(props.to)
  return (
    <Link
      style={{textDecoration: match ? 'underline' : 'none'}}
      to={props.to}
      {...props}
    />
  )
}

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

const AuthenticatedApp = ({user, logout}) => {
  const [userData, dispatch] = React.useReducer(userDataReducer, user)

  return (
    <>
      <nav>
        <NavLink to="/">About</NavLink> |{' '}
        <NavLink to="/dashboard">Dashboard</NavLink> |
        <NavLink to="/user-settings">Settings</NavLink>
      </nav>
      <button onClick={logout}>Logout</button>
      <Routes>
        <Route path="/" element={<About />} />
        <Route
          path="/dashboard"
          element={<Dashboard data={userData} dispatch={dispatch} />}
        />
        <Route path="/user-settings" element={<UserSettings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export {AuthenticatedApp}
