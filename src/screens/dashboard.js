import * as React from 'react'
import {clientFacade as client} from '../utils/api-client'
import currency from 'currency.js'

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

function List({list}) {
  const renderListByType = list.map(x => {
    if (x.type === 'goal')
      return (
        <li key={x._id}>
          {x.description} commitment: {x.amount} balance: {x.goalBalance}
        </li>
      )

    return (
      <li key={x._id}>
        {x.description} amount: {x.amount}
      </li>
    )
  })

  return <ol>{renderListByType}</ol>
}
function AddSpending({data, dispatch}) {
  const [spending, setSpending] = React.useState({
    description: '',
    amount: 0,
    type: 'normal',
    payPeriodId: data.payPeriods[data.payPeriods.length - 1]._id,
    goalAmount: '',
  })

  const onChange = e => {
    const target = e.target
    setSpending({...spending, [target.name]: target.value})
  }

  const onSelectTypeHandler = e => {
    setSpending({...spending, type: e.target.value})
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
    let body = {...spending}
    if (spending.type === 'goal') {
      body = {
        ...body,
        goalBalance: spending.amount,
      }
    }

    client('spending/create-spending', {
      data: body,
      token: data.token,
    })
      .then(res => dispatch({type: 'add-spending', payload: res}))
      .catch(console.log) // TODO: handle error to render error message
  }

  const renderFeildsForGoals = () => (
    <input
      type="text"
      name="goalAmount"
      onChange={onChange}
      value={spending.goalAmount}
    />
  )
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
      <select value={spending.type} onChange={onSelectTypeHandler}>
        <option value="normal">normal</option>
        <option value="free">free</option>
        <option value="emr">emr</option>
        <option value="goal">goal</option>
        <option value="fixed">fixed</option>
      </select>
      {spending.type === 'goal' && renderFeildsForGoals()}
      <button type="sumibt">Add</button>
    </form>
  )
}

const Dashboard = ({data, dispatch}) => {
  if (data.payPeriods.length === 0)
    return <CreateIntialPayPeriod data={data} dispatch={dispatch} />

  const {username, currentSpendings, token} = data

  const currentPayPeriod = data.payPeriods[data.payPeriods.length - 1]

  const filterSpendingsByType = filter(currentSpendings)
  const normalSpendings = filterSpendingsByType('normal')
  const fixedSpendings = filterSpendingsByType('fixed')
  const emrSpendings = filterSpendingsByType('emr')
  const freeSpendings = filterSpendingsByType('free')
  const goalSpendings = filterSpendingsByType('goal')

  /**
   * averagePayPerPeriod: "1600.00"
emrCommitmentAmount: "100.00"
emrRemainingBalance: "0.00"
emrtype: 3
numberOfPayPeriodPerMonth: 2
   */

  /**
   * calculate EMR status
   * avgPay = reduce payPeriods.pay
   *
   * emrGoalBalance = avgPay * numberOfPayPeriodPerMonth * emrType
   *
   * currentBalance = emrCommitmentAmount + emrRemainingBalance - reduce(emrSpendings)
   *
   * render -> {currentBalance/emrGoalBalance}
   *
   */

  /**
   * calculate budget:
   *
   * budget = pay - emr - reduced(goals) - reduced(fixed)
   * remainingBudget: budget - reduced(normal)
   */
  const avgPay = data.payPeriods
    .map(x => currency(x.pay).value)
    .reduce((a, b) => currency(a).add(b).value)
  const emrGoal = currency(avgPay)
    .multiply(data.numberOfPayPeriodPerMonth)
    .multiply(data.emrtype).value

  const sumOf = spendings =>
    spendings
      .map(x => currency(x.amount).value)
      .reduce((a, b) => currency(a).add(b).value, 0)

  const emrCurrentBalance = currency(data.emrRemainingBalance)
    .add(data.emrCommitmentAmount)
    .subtract(sumOf(emrSpendings)).value
  const budget = currency(currentPayPeriod.pay)
    .subtract(data.emrCommitmentAmount)
    .subtract(sumOf(fixedSpendings))
    .subtract(sumOf(goalSpendings)).value
  const remainingBudget = currency(budget).subtract(sumOf(normalSpendings))
    .value

  // calculater free money
  /**
   * freeMoney = sumOfSurplus - sumOf(freeSpendings)
   */
  const previousPayPeriods = data.payPeriods.slice(
    0,
    data.payPeriods.length - 1,
  )

  const surplus =
    previousPayPeriods.length != 0
      ? previousPayPeriods
          .map(x => x.remainingBalance)
          .reduce((a, b) => currency(a).add(b).value, 0)
      : 0

  const freeMoney = currency(surplus).subtract(sumOf(freeSpendings)).format()

  return (
    <>
      <h1>Dashboard</h1>
      <p>Username: {username}</p>
      <p>Add Spending by type: </p>
      <AddSpending data={data} dispatch={dispatch} />
      <h1>EMR Fund Status: </h1>
      <p>
        {emrCurrentBalance}/{emrGoal}
      </p>
      <List list={emrSpendings} />
      <span>Use EMR Fund</span> | <span>View Usage</span>
      <hr />
      <h1>Free Money: {freeMoney}</h1>
      <List list={freeSpendings} />
      <span>Use EMR Fund</span> | <span>View Usage</span>
      <hr />
      <h1>Current Budget: </h1>
      <p>
        {remainingBudget} / {budget}
      </p>
      <List list={normalSpendings} />
      <h1>Fixed Spendings: </h1>
      <span>(Convered to Monthly)</span>
      <List list={fixedSpendings} />
      <hr />
      <h1>Goals: </h1>
      <List list={goalSpendings} />
      <hr />
    </>
  )
}

// util functions
function filter(spendings) {
  return type => spendings.filter(x => x.type === type)
}

export {Dashboard}
