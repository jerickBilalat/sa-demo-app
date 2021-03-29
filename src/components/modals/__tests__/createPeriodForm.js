import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {CreateNextPeriodFormDialog} from '../createPeriodForm'

describe('CreateNextPeriodFormDialog', () => {
  let props = {
    fixedSpendings: [
      {
        refPayPeriods: ['603276bb4f02f09a95d3486e'],
        _id: '6032801c4f02f09a95d34874',
        description: 'phone',
        amount: '50',
        type: 'fixed',
        refUser: '603276bb4f02f09a95d3486d',
        createdAt: '2021-02-21T15:45:32.885Z',
        updatedAt: '2021-02-21T15:46:50.979Z',
        __v: 0,
      },
      {
        refPayPeriods: ['603276bb4f02f09a95d3486e'],
        _id: '6032801c4f02f09a95d34877',
        description: 'rent',
        amount: '1200',
        type: 'fixed',
        refUser: '603276bb4f02f09a95d3486d',
        createdAt: '2021-02-21T15:45:32.885Z',
        updatedAt: '2021-02-21T15:46:50.979Z',
        __v: 0,
      },
    ],
    carryOverFixed: ['6032801c4f02f09a95d34874', '6032801c4f02f09a95d34877'],
    setCarryOverFixed: jest.fn(),
    carryOverGoals: ['603280324f02f09a95d34875'],
    setCarryOverGoals: jest.fn(),
    goalSpendings: [
      {
        refPayPeriods: ['603276bb4f02f09a95d3486e'],
        _id: '603280324f02f09a95d34875',
        description: 'New Car',
        amount: '50',
        type: 'goal',
        goalBalance: '5,100.00',
        goalAmount: '10000',
        refUser: '603276bb4f02f09a95d3486d',
        createdAt: '2021-02-21T15:45:54.869Z',
        updatedAt: '2021-02-21T15:46:50.992Z',
        __v: 0,
      },
    ],
    remainingBudget: '1000',
    emrCurrentBalance: '1100',
    modalToggle: true,
    doCloseModal: jest.fn(),
    dispatch: jest.fn(),
  }

  it('should submits with the right data', () => {
    props = {...props}
    render(<CreateNextPeriodFormDialog {...props} />)

    expect(screen.getByText(/phone \$50.00/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone \$50.00/i).checked).toBe(true)
    expect(screen.getByText(/rent \$1,200.00/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/rent \$1,200.00/i).checked).toBe(true)
    expect(
      screen.getByText(/new car commiting \$50.00 per period/i),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText(/new car commiting \$50.00 per period/i).checked,
    ).toBe(true)
    userEvent.type(screen.getByLabelText(/income/i), '1,500')
    userEvent.click(screen.getByText(/^create$/i))

    expect(props.dispatch).toHaveBeenCalledWith({
      type: 'create-next-period',
      payload: expect.objectContaining({
        pay: '1500',
        emrCurrentBalance: '1100',
        remainingBudget: '1000',
        continuedFixedSpendings: props.carryOverFixed,
        continuedGoals: props.carryOverGoals,
      }),
    })

    expect(props.doCloseModal).toHaveBeenCalled()
  })
})
