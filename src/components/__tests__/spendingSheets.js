import * as React from 'react'
import {
  NormalSpendingSheets,
  FixedSpendingSheet,
  GoalSpendingSheet,
} from '../spendingSheets'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('NormalSpendingSheets', () => {
  const spendings = [
    {
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
    {
      refPayPeriods: ['603276bb4f02f09a95d3486e'],
      _id: '6032801c4f02f09a95d34873',
      description: 'car repair',
      amount: '300',
      type: 'emr',
      refUser: '603276bb4f02f09a95d3486d',
      createdAt: '2021-02-21T15:45:32.885Z',
      updatedAt: '2021-02-21T15:46:50.979Z',
      __v: 0,
    },
    {
      refPayPeriods: ['603276bb4f02f09a95d3486e'],
      _id: '6032801c4f02f09a95d34872',
      description: 'date night',
      amount: '50',
      type: 'free',
      refUser: '603276bb4f02f09a95d3486d',
      createdAt: '2021-02-21T15:45:32.885Z',
      updatedAt: '2021-02-21T15:46:50.979Z',
      __v: 0,
    },
  ]
  const props = {
    spendings,
    setSpendingToEdit: jest.fn(),
    setAddSpendingModal: jest.fn(),
    setUseEmrFundModal: jest.fn(),
    setUseFreeMoneyModal: jest.fn(),
    doToggleModal: jest.fn(),
  }
  it('should show list of spendings', () => {
    const {getByText} = render(<NormalSpendingSheets {...props} />)

    expect(getByText(/^groceries$/i)).toBeInTheDocument()
    expect(getByText(/^\$100.00$/)).toBeInTheDocument()
    expect(getByText(/^car repair$/i)).toBeInTheDocument()
    expect(getByText(/^\$300.00$/)).toBeInTheDocument()
    expect(getByText(/^Emergency$/)).toBeInTheDocument()
    expect(getByText(/^date night$/i)).toBeInTheDocument()
    expect(getByText(/^\$50.00$/)).toBeInTheDocument()
    expect(getByText(/^Spludge$/)).toBeInTheDocument()
  })

  it('should edit when clicked a spending with a type of normal', () => {
    const {getByText} = render(<NormalSpendingSheets {...props} />)
    const listItem = getByText(/^groceries$/i)

    userEvent.click(listItem)

    expect(props.setSpendingToEdit).toHaveBeenCalledWith(props.spendings[0])
    expect(props.doToggleModal).toHaveBeenCalledWith(props.setAddSpendingModal)
  })

  it('should edit when clicked a spending with a type of emr', () => {
    const {getByText} = render(<NormalSpendingSheets {...props} />)
    const listItem = getByText(/^car repair$/i)

    userEvent.click(listItem)

    expect(props.setSpendingToEdit).toHaveBeenCalledWith(props.spendings[1])
    expect(props.doToggleModal).toHaveBeenCalledWith(props.setUseEmrFundModal)
  })

  it('should edit when clicked a spending with a type of spludge', () => {
    const {getByText} = render(<NormalSpendingSheets {...props} />)
    const listItem = getByText(/^date night$/i)

    userEvent.click(listItem)

    expect(props.setSpendingToEdit).toHaveBeenCalledWith(props.spendings[2])
    expect(props.doToggleModal).toHaveBeenCalledWith(props.setUseFreeMoneyModal)
  })
})
