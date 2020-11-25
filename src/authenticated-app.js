import * as React from 'react'

const AuthenticatedApp = ({user, logout}) => {
  return <button onClick={logout}>Logout</button>
}

export {AuthenticatedApp}
