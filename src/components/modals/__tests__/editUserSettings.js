import * as React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {EditUserPreferenceDialog} from '../editUserSettings'

describe('Name of the group', () => {
  let props = {
    userData: {
      numberOfPayPeriodPerMonth: '2',
      emrCommitmentAmount: '50.00',
      emrRemainingBalance: '100.00',
      emrtype: 6,
    },
    dispatch: jest.fn(),
    modalToggle: true,
    doCloseModal: jest.fn(),
  }
  it.only('should submit properly with valid data ', () => {
    render(<EditUserPreferenceDialog {...props} />)

    const numberofPeriodPerMonth = screen.getByLabelText(
        /number of budget period per month/i,
      ),
      emrRemainingBalance = screen.getByLabelText(
        /How much is your current Emergency Fund/i,
      ),
      emrCommitmentAmount = screen.getByLabelText(
        /How much do you want to transfer to Emergency Fund every budget period/i,
      ),
      emrtype = screen.getByLabelText(
        /If you lost your job, you might be unemployed for how many months/i,
      )

    expect(numberofPeriodPerMonth.value).toBe(
      props.userData.numberOfPayPeriodPerMonth,
    )
    expect(emrRemainingBalance.value).toBe(
      `$${props.userData.emrRemainingBalance}`,
    )

    expect(emrCommitmentAmount.value).toBe(
      `$${props.userData.emrCommitmentAmount}`,
    )
    expect(emrtype.value).toBe(`${props.userData.emrtype}`)

    userEvent.type(numberofPeriodPerMonth, '1')
    userEvent.type(emrtype, '3')
    userEvent.click(screen.getByText(/done/i))

    expect(props.dispatch).toHaveBeenCalledWith({
      type: 'update-user-settings',
      payload: expect.objectContaining({
        emrtype: 3,
        numberOfPayPeriodPerMonth: 1,
      }),
    })
  })
})
