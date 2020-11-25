import * as React from 'react'

const UnAuthenticatedApp = ({login, register}) => {
  return (
    <>
      <button
        onClick={() =>
          register({
            username: 'mel-jrk',
            password: 'jrkmel123',
            emrtype: 3,
            emrRemainingBalance: '0.00',
            averagePayPerPeriod: '1600.00',
            numberOfPayPeriodPerMonth: 2,
            emrCommitmentAmount: '100.00',
          })
        }
      >
        Register
      </button>
      <button
        onClick={() => login({username: 'mel-jrk', password: 'jrkmel123'})}
      >
        Login
      </button>
    </>
  )
}

export {UnAuthenticatedApp}
