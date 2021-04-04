import * as React from 'react'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {SpendingFormDialog} from '../spendingForm'
import actions from '../../../utils/actions'

describe('SpendingFormDialog', () => {
  let props = {
    doToggleModal: jest.fn(),
    modalToggle: true,
    dispatch: jest.fn(),
    setSpendingToEdit: jest.fn(),
    currentPayPeriodID: 'jslkdjfldksjf',
    userData: {userID: 'jfsdlkjflsinwe'},
    setCarryOverFixed: jest.fn(),
    setCarryOverGoals: jest.fn(),
    editButtonText: 'Edit',
    createButtonText: 'Create',
  }

  it('should render budget/emr/spludge/fixed spending modal dialog with correct labels and with filled fields', () => {
    props = {
      ...props,
      spendingToEdit: {description: 'food', amount: '10.00'},
      type: 'normal',
      modalTitle: 'Budget Spending',
      modalContentText: 'Spend wisely',
    }
    const {getByText, getByLabelText} = render(
      <SpendingFormDialog {...props} />,
    )

    const inputNodeForDescription = getByLabelText(/description/i)
    const inputNodeForCost = getByLabelText(/cost/i)

    expect(getByText(/budget spending/i)).toBeInTheDocument()
    expect(getByText(/spend wisely/i)).toBeInTheDocument()
    expect(inputNodeForDescription.value).toBe(props.spendingToEdit.description)
    expect(inputNodeForCost.value).toBe(`$${props.spendingToEdit.amount}`)
    expect(getByText(/edit/i)).toBeInTheDocument()
  })

  it('should render budget/emr/spludge/fixed spending modal dialog with empty fields', () => {
    props = {
      ...props,
      spendingToEdit: undefined,
      type: 'normal',
    }

    const {getByText, getByLabelText} = render(
      <SpendingFormDialog {...props} />,
    )
    const inputNodeForDescription = getByLabelText(/description/i)
    const inputNodeForCost = getByLabelText(/cost/i)

    expect(getByText(/create/i)).toBeInTheDocument()
    expect(inputNodeForDescription.value).toBe('')
    expect(inputNodeForCost.value).toBe(`$0`)
  })

  it('should submits a new budget/emr/spludge/fixed fund spending', () => {
    props = {
      ...props,
      spendingToEdit: undefined,
      type: 'normal',
    }

    const {getByText, getByLabelText} = render(
      <SpendingFormDialog {...props} />,
    )
    userEvent.type(getByLabelText(/description/i), 'gas')
    userEvent.type(getByLabelText(/cost/i), '30')
    userEvent.click(getByText(/create/i))

    expect(props.dispatch).toHaveBeenCalledWith({
      type: actions.ADD_SPENDING,
      payload: expect.objectContaining({
        description: 'gas',
        amount: '30',
        refPayPeriods: [props.currentPayPeriodID],
      }),
    })
    expect(props.doToggleModal).toHaveBeenCalled()
  })

  it('should submits an existing edited budget/emr/spludge/fixed fund spending', async () => {
    props = {
      ...props,
      spendingToEdit: {
        refPayPeriods: ['603276bb4f02f09a95d3486e'],
        _id: '6032801c4f02f09a95d34876',
        description: 'food',
        amount: '30',
        type: 'normal',
        refUser: '603276bb4f02f09a95d3486d',
        createdAt: '2021-02-21T15:45:32.885Z',
        updatedAt: '2021-02-21T15:46:50.979Z',
        __v: 0,
      },
      type: 'normal',
    }

    const {getByText, getByLabelText} = render(
      <SpendingFormDialog {...props} />,
    )

    userEvent.type(getByLabelText(/description/i), 's')

    userEvent.click(getByText(/edit/i))
    expect(props.dispatch).toHaveBeenCalledWith({
      type: actions.ADD_SPENDING,
      payload: expect.objectContaining({
        refPayPeriods: ['603276bb4f02f09a95d3486e'],
        _id: '6032801c4f02f09a95d34876',
        description: 'foods',
        type: 'normal',
        refUser: '603276bb4f02f09a95d3486d',
        createdAt: '2021-02-21T15:45:32.885Z',
      }),
    })
    expect(props.doToggleModal).toHaveBeenCalled()
  })

  it('should validate form data before submitting', () => {
    props = {
      ...props,
      spendingToEdit: undefined,
      type: 'normal',
    }

    const {getAllByText, getByText, getByLabelText} = render(
      <SpendingFormDialog {...props} />,
    )

    userEvent.clear(getByLabelText(/cost/i))
    userEvent.click(getByText(/create/i))

    expect(props.dispatch).not.toHaveBeenCalled()
    expect(props.doToggleModal).not.toHaveBeenCalled()

    expect(getAllByText(/can not be empty/i)[0]).toBeInTheDocument()
    expect(getAllByText(/can not be empty/i)[1]).toBeInTheDocument()
  })

  it('should delete existing item', () => {
    props = {
      ...props,
      spendingToEdit: {
        refPayPeriods: ['603276bb4f02f09a95d3486e'],
        _id: '6032801c4f02f09a95d34876',
        description: 'groceries',
        amount: '100',
        type: 'normal',
        refUser: '603276bb4f02f09a95d3486d',
        createdAt: '2021-02-21T15:45:32.885Z',
        updatedAt: '2021-02-21T15:46:50.979Z',
        __v: 0,
      },
      type: 'normal',
    }
    const {getByText} = render(<SpendingFormDialog {...props} />)
    userEvent.click(getByText(/delete/i))

    expect(props.dispatch).toHaveBeenCalledWith({
      type: actions.DELETE_SPENDING,
      payload: expect.objectContaining({
        ...props.spendingToEdit,
      }),
    })
    expect(props.doToggleModal).toHaveBeenCalled()
  })
  it('should be able cancel while creating a new spending', () => {
    const {getByText} = render(<SpendingFormDialog {...props} />)
    userEvent.click(getByText(/cancel/i))
    expect(props.doToggleModal).toHaveBeenCalled()
  })
  it('should show additional fields when modifying a Goal typed spending', () => {
    props = {...props, type: 'goal'}
    const {getByLabelText} = render(<SpendingFormDialog {...props} />)
    expect(getByLabelText(/current balance/i)).toBeInTheDocument()
    expect(getByLabelText(/goal amount/i)).toBeInTheDocument()
  })
  it('should be able to modify Goal typed spending additional fields', () => {
    props = {...props, type: 'goal', spendingToEdit: undefined}
    const {getByText, getByLabelText, unmount} = render(
      <SpendingFormDialog {...props} />,
    )
    userEvent.type(getByLabelText(/description/i), 'vacation fund')
    userEvent.type(getByLabelText(/cost/i), '10')
    userEvent.type(getByLabelText(/current balance/i), '100')
    userEvent.type(getByLabelText(/goal amount/i), '500')
    userEvent.click(getByText(/create/i))
    //TODO: test values, same issues of event not triggering
    expect(props.dispatch).toHaveBeenCalledWith({
      type: actions.ADD_SPENDING,
      payload: expect.objectContaining({
        description: 'vacation fund',
        refPayPeriods: [props.currentPayPeriodID],
      }),
    })
    expect(props.doToggleModal).toHaveBeenCalled()
    unmount()
  })
  it('should call setCarryOverFixed when spending type is fixed', () => {
    props = {
      ...props,
      spendingToEdit: {
        type: 'fixed',
        description: 'sample_bill',
        amount: '10.00',
      },
    }
    const {getByText} = render(<SpendingFormDialog {...props} />)
    userEvent.click(getByText(/edit/i))
    expect(props.setCarryOverFixed).toHaveBeenCalled()
  })
  it('should call setCarryOverGoals when spending type is goals', () => {
    props = {
      ...props,
      spendingToEdit: {
        type: 'goal',
        description: 'sample_goal',
        goalAmount: '10000',
        goalBalance: '1000',
        amount: '100.00',
      },
    }
    const {getByText} = render(<SpendingFormDialog {...props} />)
    userEvent.click(getByText(/edit/i))
    expect(props.setCarryOverGoals).toHaveBeenCalled()
  })
})

// {
//   description: 'gas',
//   amount: '30',
//   _id: '763e28ef-740e-46dd-bf6b-00e482ed2c3e',
//   type: 'normal',
//   refUser: 'jfsdlkjflsinwe',
//   refPayPeriods: [ 'jslkdjfldksjf' ],
//   createdAt: '2021-04-04T18:01:26.786Z',
//   updatedAt: '2021-04-04T18:01:26.786Z'
// }

// {
//   description: 'foods',
//   amount: '30',
//   _id: '6032801c4f02f09a95d34876',
//   type: 'normal',
//   refUser: '603276bb4f02f09a95d3486d',
//   refPayPeriods: [ '603276bb4f02f09a95d3486e' ],
//   createdAt: '2021-02-21T15:45:32.885Z',
//   updatedAt: '2021-04-04T18:02:31.008Z'
// }
