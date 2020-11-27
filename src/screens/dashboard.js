import * as React from 'react'
import {useQuery} from 'react-query'
import {clientFacade as client} from '../utils/api-client'

function CreateIntialPayPeriod({data, dispatch}) {
  // TODO: normalize the input into the right format of type string
  const [form, setForm] = React.useState({pay: '0.00'})

  const onChange = e => {
    const target = e.target
    setForm({...form, [target.name]: target.value})
  }
  const onSubmit = event => {
    event.preventDefault()
    client('pay-period/create-initial-pay-period', {
      data: {pay: form.pay},
      token: data.token,
    }).then(res => {
      console.log(res)
      return dispatch({type: 'add-payPeriod', payload: res})
    })
  }
  return (
    <>
      <h1>Create First Pay Period</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={form.pay} name="pay" onChange={onChange} />
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

function AddSpending({data, dispatch}) {
  const [spending, setSpending] = React.useState({description: '', amount: 0})

  const onChange = e => {
    const target = e.target
    setSpending({...spending, [target.name]: target.value})
  }
  // FIXME: DUMMY DATA
  const dummyData = {
    description: 'flat screentv',
    amount: '255.00',
    payPeriodId: data.payPeriods[data.payPeriods.length - 1]._id,
    type: 'normal',
  }
  const onSubmit = e => {
    e.preventDefault()
    client('spending/create-spending', {
      data: dummyData,
      token: data.token,
    })
      .then(res => dispatch({type: 'add-spending', payload: res}))
      .catch(console.log) // TODO: handle error to render error message
  }
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="description"
        onChange={onChange}
        value={spending.description}
      />
      <input
        type="number"
        name="amount"
        onChange={onChange}
        value={spending.amount}
      />
      <button type="sumibt">Add</button>
    </form>
  )
}

const Dashboard = ({data, dispatch}) => {
  if (data.payPeriods.length === 0)
    return <CreateIntialPayPeriod data={data} dispatch={dispatch} />

  const {username, currentSpendings, token} = data

  return (
    <>
      <h1>Dashboard</h1>
      <p>{username}</p>
      <ol>
        {currentSpendings.map(x => (
          <li key={x._id}>{x.description}</li>
        ))}
      </ol>
      <AddSpending data={data} dispatch={dispatch} />
    </>
  )
}

export {Dashboard}
