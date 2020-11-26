import * as React from 'react'
import {Link, Routes, Route} from 'react-router-dom'
import {Dashboard} from './screens/dashboard'
import {NotFound} from './screens/notFound'
import {UserSettings} from './screens/userSettings'

const AuthenticatedApp = ({user, logout}) => {
  return (
    <>
      <nav>
        <Link to="/">Dashboard</Link>|<Link to="/user-settings">Settings</Link>
      </nav>
      <button onClick={logout}>Logout</button>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user-settings" element={<UserSettings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export {AuthenticatedApp}
