import axios from 'axios'

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
  return Promise.reject(err.response.data.message)
}

export {clientFacade}
