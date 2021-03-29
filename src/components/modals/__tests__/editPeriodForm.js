import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {EditPayPeriodFormDialog} from '../editPeriodForm'
import actions from '../../../utils/actions'

describe('EditPayPeriodFormDialog component', () => {
  let props = {
    modalToggle: true,
    doCloseModal: jest.fn(),
    currentPayPeriod: {_id: 'dummyId'},
    dispatch: jest.fn(),
  }
  it('should submits form properly', () => {
    render(<EditPayPeriodFormDialog {...props} />)
    userEvent.type(screen.getByLabelText(/income/i), '1,500')
    userEvent.click(screen.getByText(/done/i))
    expect(props.dispatch).toHaveBeenCalledWith({
      type: actions.MODIFY_PERIOD,
      payload: expect.objectContaining({
        payPeriodID: props.currentPayPeriod._id,
        pay: '1500',
      }),
    })
    expect(props.doCloseModal).toHaveBeenCalled()
  })
})
