import axios from 'axios'
import * as auth from '../auth-provider'

function clientFacade(endPoint, {headers: customHeaders, customConfig} = {}) {
  const config = {
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL}/${endPoint}`,
    headers: {
      ...customHeaders,
    },
    ...customConfig,
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
