import axios from 'axios'
import * as auth from '../auth-provider'
function clientFacade(
  endPoint,
  {data, token, headers: customHeaders, ...restOfCustomConfig} = {},
) {
  const config = {
    method: data ? 'POST' : 'GET',
    url: `${process.env.REACT_APP_API_URL}/${endPoint}`,
    data: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : undefined,
      'x-auth-token': token || undefined,
      ...customHeaders,
    },
    ...restOfCustomConfig,
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
  if (err.response.status === '401') {
    auth.logout().then(() => window.location.assign(window.location))
    return
  }
  if (err.response) return Promise.reject(err.response.data)
  return Promise.reject(err)
}

export {clientFacade}
