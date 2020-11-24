import axios from 'axios'

function clientFacade(endPoint, customConfig = {}) {
  const config = {
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL}/${endPoint}`,
    headers: {
      'x-auth-token':
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZmJjNDkzZWMyMjM0NDBiMTA2MDc5MWYiLCJpYXQiOjE2MDYxNzUwMzgsInVzZXJuYW1lIjoiTWVsLWpyayIsImlkIjoiNWZiYzQ5M2VjMjIzNDQwYjEwNjA3OTFmIn0.FT-uiUkoCkGGI66SM-Pek8Dg0QP9wGyq1OoixuWpQ30',
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
