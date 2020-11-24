import React from 'react'
import './App.css'
import {clientFacade as client} from './utils/api-client'
import {useAsync} from './utils/hooks'

function App() {
  const {data, error, run, isLoading, isError, isSuccess} = useAsync()

  React.useEffect(() => {
    run(client('spending/by?payPeriodId=5fbc4971c223440b10607920&type=normal'))
  }, [run])

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {isError && (
        <h2>
          <h2>Error:</h2>
          {error}
        </h2>
      )}
      {isSuccess && console.log(data)}
    </>
  )
}

export default App
