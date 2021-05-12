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

export default function userDataReducer(state, action) {
  switch (action.type) {
    case actions.UPDATE_USER_SETTINGS:
      return modifyUserSettings(state, action)
    case actions.MODIFY_PERIOD:
      return modifyPeriod(state, action)
    case actions.CREATE_PERIOD:
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
        currentSpendings: [
          ...carryOverFixedSpendings,
          ...carryOverGoalSpendings,
        ],
      }
    case actions.ADD_SPENDING:
      let spending = action.payload
      let currentSpendings = state.currentSpendings

      if (currentSpendings.map(x => x._id).includes(spending._id)) {
        currentSpendings = state.currentSpendings.filter(
          x => x._id !== spending._id,
        )
      }

      return {
        ...state,
        currentSpendings: [...currentSpendings, spending],
      }
    case actions.DELETE_SPENDING:
      const deletedSpendingId = action.payload._id
      return {
        ...state,
        currentSpendings: [
          ...state.currentSpendings.filter(x => x._id !== deletedSpendingId),
        ],
      }
    default:
      return state
  }
}
