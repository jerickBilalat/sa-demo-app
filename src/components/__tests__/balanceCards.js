import * as React from 'react'
import {EmrFundCard, FreeMoneyCard, BudgetCard} from '../balanceCards'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('BudgeCard', () => {
  const props = {
    remainingBudget: '$1300',
    budget: '$1500',
    spent: '$200',
    status: 25,
    doToggleModal: jest.fn(),
  }
  it('should show all Budget card information ', () => {
    const {getByText} = render(<BudgetCard {...props} />)

    expect(getByText(/\$1300/i)).toBeInTheDocument()
    expect(getByText(/\$1500/i)).toBeInTheDocument()
    expect(getByText(/\$200/i)).toBeInTheDocument()
    expect(getByText(/25%/i)).toBeInTheDocument()
  })
  it('should trigger doToggleModal callback when the use button is click', () => {
    const {getByText} = render(<BudgetCard {...props} />)

    const button = getByText(/^spend$/i)

    userEvent.click(button)

    expect(props.doToggleModal).toHaveBeenCalled()
  })
})

describe('EmrFundCard', () => {
  let props
  beforeEach(() => {
    props = {
      emrCommitment: '$50',
      emrGoal: '$120000',
      emrCurrentBalance: '$6000',
      status: 50,
      doToggleModal: jest.fn(),
    }
  })
  it('should show all emergency fund information ', () => {
    const {getByText} = render(<EmrFundCard {...props} />)

    expect(getByText(/\$50/i)).toBeInTheDocument()
    expect(getByText(/\$12000/i)).toBeInTheDocument()
    expect(getByText(/50%/i)).toBeInTheDocument()
  })
  it('should trigger doToggleModal callback when the use button is click', () => {
    const {getByText} = render(<EmrFundCard {...props} />)

    const button = getByText(/^use$/i)

    userEvent.click(button)

    expect(props.doToggleModal).toHaveBeenCalled()
  })
})

describe('FreeMoneyCard', () => {
  let props
  beforeEach(() => {
    props = {
      freeMoney: '$100',
      doToggleModal: jest.fn(),
    }
  })
  it('should show all Spludge money information ', () => {
    const {getByText} = render(<FreeMoneyCard {...props} />)
    expect(getByText(/\$100/i)).toBeInTheDocument()
  })
  it('should trigger doToggleModal callback when the use button is click', () => {
    const {getByText} = render(<FreeMoneyCard {...props} />)

    const button = getByText(/^spludge$/i)

    userEvent.click(button)

    expect(props.doToggleModal).toHaveBeenCalled()
  })
})
