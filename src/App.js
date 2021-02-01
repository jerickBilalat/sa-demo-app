import React from 'react'
import './App.css'
import {clientFacade as client} from './utils/api-client'
import {useAsync} from './utils/hooks'
import * as auth from './auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnAuthenticatedApp} from './unauthenticated-app'
import {BrowserRouter} from 'react-router-dom'

async function getUser() {
  let user = null
  const token = await auth.getToken()

  if (token) {
    const data = await client('auth/get-user-current-data', {token})
    user = data
    user.token = token
  }
  return user
}

function App() {
  const {
    data,
    error,
    isIdle,
    isLoading,
    isSuccess,
    isError,
    setData,
  } = useAsync()

  React.useEffect(() => {
    getUser()
      .then(userData => setData(userData))
      .catch(console.log) // TODO: ADD HANDLER
  }, [setData])

  const login = credentials =>
    auth.login({...credentials}).then(userData => setData(userData))

  const logout = () => {
    auth.logout()
    setData(null)
  }

  const register = form =>
    auth.register(form).then(() =>
      getUser()
        .then(userData => setData(userData))
        .catch(err => {
          throw new Error(err)
        }),
    )

  const props = {user: data, login, logout, register}

  if (isError) {
    return <h1>Error - {error}. Please refreah the page.</h1>
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isIdle) {
    return <h1>Fetching...</h1>
  }

  if (isSuccess) {
    return data ? (
      <BrowserRouter>
        <AuthenticatedApp {...props} />
      </BrowserRouter>
    ) : (
      <UnAuthenticatedApp {...props} />
    )
  }
}

export default App
