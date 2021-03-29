import reducer from '../reducer'
import defaultState from '../defaultState'
import actions from '../actions'

describe('app main reducer', () => {
  it('should update user settings', () => {
    expect(
      reducer(defaultState, {
        type: actions.UPDATE_USER_SETTINGS,
        payload: {
          emrtype: 4,
          emrRemainingBalance: '100.00',
          emrCommitmentAmount: '200.00',
          numberOfPayPeriodPerMonth: 1,
        },
      }),
    ).toStrictEqual(
      expect.objectContaining({
        emrtype: 4,
        emrRemainingBalance: '100.00',
        emrCommitmentAmount: '200.00',
        numberOfPayPeriodPerMonth: 1,
      }),
    )
  })

  it('should modify current period', () => {
    const newState = reducer(defaultState, {
      type: actions.MODIFY_PERIOD,
      payload: {
        payPeriodID: '603276bb4f02f09a95d3486e',
        pay: '1700.00',
      },
    })

    const {payPeriods} = newState

    expect(payPeriods[payPeriods.length - 1]).toEqual(
      expect.objectContaining({
        pay: '1700.00',
      }),
    )
  })

  it('should create new period', () => {
    const newState = reducer(defaultState, {
      type: actions.CREATE_PERIOD,
      payload: {
        pay: '1700.00',
        remainingBudget: '100.00',
        continuedFixedSpendings: ['6032801c4f02f09a95d34874'],
        continuedGoals: ['603280324f02f09a95d34875'],
      },
    })

    const {payPeriods} = newState

    expect(payPeriods[payPeriods.length - 2]).toEqual(
      expect.objectContaining({
        remainingBudget: '100.00',
      }),
    )
    expect(payPeriods[payPeriods.length - 1]).toEqual(
      expect.objectContaining({
        pay: '1700.00',
        remainingBudget: '0.00',
      }),
    )
  })

  it('should add new spending', () => {
    const newSpending = {
      description: 'a spending',
      amount: '10.00',
      _id: 'example-ID',
      type: 'normal',
      refUser: 'example-userID',
      refPayPeriods: ['example-currentPayPeriodID'],
      createdAt: 'example-dataString',
      updatedAt: 'example-dateString',
    }

    const newState = reducer(defaultState, {
      type: actions.ADD_SPENDING,
      payload: newSpending,
    })

    const {currentSpendings} = newState

    expect(currentSpendings[currentSpendings.length - 1]).toEqual(
      expect.objectContaining({
        ...newSpending,
      }),
    )
  })

  it('should modify a spending', () => {
    const modifiedSpending = {
      refPayPeriods: ['603276bb4f02f09a95d3486e'],
      _id: '6032801c4f02f09a95d34876',
      description: 'updated description',
      amount: '200.00',
      type: 'normal',
      refUser: '603276bb4f02f09a95d3486d',
      createdAt: '2021-02-21T15:45:32.885Z',
      updatedAt: '2021-02-21T15:46:50.979Z',
    }

    const newState = reducer(defaultState, {
      type: actions.ADD_SPENDING,
      payload: modifiedSpending,
    })

    const {currentSpendings} = newState

    expect(currentSpendings[currentSpendings.length - 1]).toEqual(
      expect.objectContaining({
        ...modifiedSpending,
      }),
    )
  })

  it('should delete a spending', () => {
    const deleteSpendingID = '6032801c4f02f09a95d34876'
    const newState = reducer(defaultState, {
      type: actions.DELETE_SPENDING,
      payload: {
        _id: deleteSpendingID,
      },
    })

    expect(
      newState.currentSpendings.filter(x => x._id === deleteSpendingID),
    ).toEqual([])
  })
})
