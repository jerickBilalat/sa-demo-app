import React from 'react'
import './App.css'
import {clientFacade as client} from './utils/api-client'
import {useAsync} from './utils/hooks'
import * as auth from './auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnAuthenticatedApp} from './unauthenticated-app'

async function getUser() {
  let user = null
  const token = await auth.getToken()

  if (token) {
    const customeHeaders = {'x-auth-token': token}
    const data = await client('auth/get_user', {
      headers: customeHeaders,
    })
    user = data
  }
  return user
}

function App() {
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    getUser().then(userData => setUser(userData))
  }, [])

  const login = credentials =>
    auth.login({...credentials}).then(userData => setUser(userData))

  const logout = () => {
    auth.logout()
    setUser(null)
  }

  const register = form => {
    auth.register(form).then(userData => setUser(userData))
  }

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnAuthenticatedApp user={user} login={login} register={register} />
  )
}

export default App
