// pretend this is firebase, netlify, or auth0's code.
// you shouldn't have to implement something like this in your own app
import axios from 'axios'

const localStorageKey = '__auth_provider_token__'

async function getToken() {
  // if we were a real auth provider, this is where we would make a request
  // to retrieve the user's token. (It's a bit more complicated than that...
  // but you're probably not an auth provider so you don't need to worry about it).
  return window.localStorage.getItem(localStorageKey)
}

function handleUserResponse({user, token}) {
  window.localStorage.setItem(localStorageKey, token)
  return user
}

function login({username, password}) {
  return client('auth/signin', {username, password}).then(handleUserResponse)
}

function register(form) {
  return client('auth/register', form).then(handleUserResponse)
}

async function logout() {
  window.localStorage.removeItem(localStorageKey)
}

// an auth provider wouldn't use your client, they'd have their own
// so that's why we're not just re-using the client
const authURL = process.env.REACT_APP_AUTH_URL

async function client(endPoint, data) {
  const config = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/${endPoint}`,
    data: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  }

  return axios(config).then(handleResponse, handleError)
}
function handleResponse(res) {
  if (res.statusText === 'OK') {
    return res.data
  } else {
    return Promise.reject(res)
  }
}

function handleError(err) {
  if (err.response) return Promise.reject(err.response.data)
  return Promise.reject(err)
}

export {getToken, login, register, logout, localStorageKey}
