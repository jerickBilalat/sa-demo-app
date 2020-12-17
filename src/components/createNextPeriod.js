import * as React from 'react'
import {clientFacade as client} from '../utils/api-client'

function CreateNextPayPeriod({
  data,
  fixedSpendings,
  goalSpendings,
  remainingBudget,
  prevPayPeriodID,
  emrCurrentBalance,
}) {
  // TODO: normalize the input into the right format of type string
  const [form, setForm] = React.useState({pay: '0.00'})
  const [carryOverGoals, setCarryOverGoals] = React.useState(
    goalSpendings.map(x => x._id),
  )
  const [carryOverFixed, setCarryOverFixed] = React.useState(
    fixedSpendings.map(x => x._id),
  )

  const onChange = e => {
    const target = e.target
    setForm({...form, [target.name]: target.value})
  }

  const onSubmit = event => {
    event.preventDefault()
    client('pay-period/create-pay-period', {
      data: {
        pay: form.pay,
        remainingBudget,
        continuedFixedSpendings: carryOverFixed,
        continuedGoals: carryOverGoals,
        prevPayPeriodID,
        emrCurrentBalance,
      },
      token: data.token,
    })
      .then(() => {
        window.location.assign(window.location.origin)
      })
      .catch(error => {
        // TODO: come up with a better centralized error
        throw new Error(error)
      })
  }
  return (
    <>
      <h1>Create Next Period</h1>
      <form onSubmit={onSubmit}>
        <p>What is your starting budget for this period?</p>
        <input type="text" value={form.pay} name="pay" onChange={onChange} />
        <p>Unchecked Fixed Spendings that does not apply to this period</p>
        {fixedSpendings.map(x => (
          <React.Fragment key={x._id}>
            <input
              type="checkbox"
              name={x.description}
              checked={carryOverFixed.includes(x._id)}
              onChange={() => {
                if (carryOverFixed.includes(x._id)) {
                  return setCarryOverFixed([
                    ...carryOverFixed.filter(id => id !== x._id),
                  ])
                }
                return setCarryOverFixed([...carryOverFixed, x._id])
              }}
            />
            <label htmlFor={x.description}>{x.description}</label>
          </React.Fragment>
        ))}
        <p>Unchecked Goals that does not apply to this period</p>
        {goalSpendings.map(x => (
          <React.Fragment key={x._id}>
            <input
              type="checkbox"
              name={x.description}
              checked={carryOverGoals.includes(x._id)}
              onChange={() => {
                if (carryOverGoals.includes(x._id)) {
                  return setCarryOverGoals([
                    ...carryOverGoals.filter(id => id !== x._id),
                  ])
                }
                return setCarryOverGoals([...carryOverGoals, x._id])
              }}
            />
            <label htmlFor={x.description}>{x.description}</label>
          </React.Fragment>
        ))}
        <p>You can edit goals and fixed spendings after creating this period</p>
        <input type="submit" value="Create Period" />
      </form>
    </>
  )
}

export {CreateNextPayPeriod}
