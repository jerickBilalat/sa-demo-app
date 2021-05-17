import {v4 as uuidv4} from 'uuid'
import currency from 'currency.js'
import actions from './actions'

const modifyUserSettings = (state, action) => {
  const {
    emrtype,
    emrRemainingBalance,
    numberOfPayPeriodPerMonth,
    emrCommitmentAmount,
  } = action.payload

  return {
    ...state,
    emrtype,
    emrCommitmentAmount,
    emrRemainingBalance,
    numberOfPayPeriodPerMonth,
  }
}

const modifyPeriod = (state, action) => {
  const {payPeriodID, pay} = action.payload
  const {payPeriods} = state
  return {
    ...state,
    payPeriods: [
      ...payPeriods.filter(period => period._id !== payPeriodID),
      {
        ...payPeriods.filter(x => x._id === payPeriodID)[0],
        pay: pay,
      },
    ],
  }
}

const createSpending = (state, action) => {
  const {
    pay,
    remainingBudget,
    continuedFixedSpendings,
    continuedGoals,
  } = action.payload

  const currentUpdatedPeriod = {
    ...state.payPeriods[state.payPeriods.length - 1],
    remainingBudget,
  }

  const newPayPeriod = {
    _id: uuidv4(),
    pay,
    remainingBudget: '0.00',
    refUser: state.userID,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const oldPeriods = state.payPeriods.filter(
    x => x._id !== currentUpdatedPeriod._id,
  )

  const carryOverFixedSpendings = [
    ...state.currentSpendings
      .filter(spending => {
        const spendingId = spending._id
        if (continuedFixedSpendings.includes(spendingId)) {
          return true
        } else {
          return false
        }
      })
      .map(spending => {
        return {
          ...spending,
          refPayPeriods: [...spending.refPayPeriods, newPayPeriod._id],
        }
      }),
  ]
  const carryOverGoalSpendings = [
    ...state.currentSpendings
      .filter(spending => {
        const spendingId = spending._id
        if (continuedGoals.includes(spendingId)) {
          return true
        } else {
          return false
        }
      })
      .map(spending => {
        return {
          ...spending,
          refPayPeriods: [...spending.refPayPeriods, newPayPeriod._id],
          goalBalance: currency(spending.amount).add(spending.goalBalance),
        }
      }),
  ]
  return {
    ...state,
    emrRemainingBalance: currency(state.emrRemainingBalance)
      .add(state.emrCommitmentAmount)
      .format(),
    payPeriods: [...oldPeriods, currentUpdatedPeriod, newPayPeriod],
    currentSpendings: [...carryOverFixedSpendings, ...carryOverGoalSpendings],
  }
}

const addSpending = (state, action) => {
  let aSpending = action.payload
  let {currentSpendings} = state

  if (currentSpendings.map(spending => spending._id).includes(aSpending._id)) {
    currentSpendings = currentSpendings.filter(x => x._id !== aSpending._id)
  }

  return {
    ...state,
    currentSpendings: [...currentSpendings, aSpending],
  }
}

const deleteSpending = (state, action) => {
  return {
    ...state,
    currentSpendings: [
      ...state.currentSpendings.filter(x => x._id !== action.payload._id),
    ],
  }
}

export default function userDataReducer(state, action) {
  switch (action.type) {
    case actions.UPDATE_USER_SETTINGS:
      return modifyUserSettings(state, action)
    case actions.MODIFY_PERIOD:
      return modifyPeriod(state, action)
    case actions.CREATE_PERIOD:
      return createSpending(state, action)
    case actions.ADD_SPENDING:
      return addSpending(state, action)
    case actions.DELETE_SPENDING:
      return deleteSpending(state, action)
    default:
      return state
  }
}
