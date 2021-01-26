import currency from 'currency.js'

function derivedUserData(data) {
  const {
    currentSpendings,
    payPeriods,
    numberOfPayPeriodPerMonth,
    emrtype,
    emrCommitmentAmount,
    emrRemainingBalance,
  } = data

  const filterSpendingsByType = type =>
    currentSpendings.filter(x => x.type === type)
  const normalSpendings = filterSpendingsByType('normal')
  const fixedSpendings = filterSpendingsByType('fixed')
  const emrSpendings = filterSpendingsByType('emr')
  const freeSpendings = filterSpendingsByType('free')
  const goalSpendings = filterSpendingsByType('goal')

  // calculate emr
  const emrGoal = payPeriods
    .map(x => currency(x.pay).value)
    .reduce((a, b) => currency(a).add(b), 0)
    .divide(payPeriods.length)
    .multiply(numberOfPayPeriodPerMonth)
    .multiply(emrtype).value
  const emrCurrentBalance = currency(emrRemainingBalance)
    .add(emrCommitmentAmount)
    .subtract(sumOf(emrSpendings)).value
  const emrCommitment =
    emrCurrentBalance >= emrGoal ? '0.00' : emrCommitmentAmount
  const emrStatus = currency(emrCurrentBalance).divide(emrGoal).multiply(100)
    .value

  // calculate budget
  const currentPayPeriod = payPeriods[payPeriods.length - 1]
  const budget = currency(currentPayPeriod.pay)
    .subtract(emrCommitment)
    .subtract(
      currency(sumOf(fixedSpendings)).divide(data.numberOfPayPeriodPerMonth)
        .value,
    )
    .subtract(sumOf(goalSpendings)).value
  const remainingBudget = currency(budget).subtract(sumOf(normalSpendings))
    .value
  const budgetSpent = sumOf(normalSpendings)
  const budgetStatus = calculateStatus(budgetSpent, budget)

  // caculate free money
  const previousPayPeriods = payPeriods.slice(0, data.payPeriods.length - 1)
  const surplus =
    previousPayPeriods.length !== 0
      ? previousPayPeriods
          .map(x => x.remainingBudget)
          .reduce((a, b) => currency(a).add(b).value, 0)
      : 0
  const freeMoney = currency(surplus).subtract(sumOf(freeSpendings)).format()

  const actualRemainingBudget = currency(remainingBudget)
    .subtract(sumOf(freeSpendings))
    .format()

  const regularSpendings = [
    ...normalSpendings,
    ...freeSpendings,
    ...emrSpendings,
  ].sort(sortDatesLatestFirst)

  //helpers
  function sumOf(spendings) {
    if (spendings.length === 0) return 0
    return spendings
      .map(x => {
        if (
          x.type === 'goal' &&
          parseInt(x.goalBalance) >= parseInt(x.goalAmount)
        )
          return 0
        return currency(x.amount).value
      })
      .reduce((a, b) => currency(a).add(b).value, 0)
  }

  function sortDatesLatestFirst(a, b) {
    const prev = new Date(a.createdAt)
    const next = new Date(b.createdAt)
    return next - prev
  }

  function formatWithCurrency(value) {
    return currency(value).format()
  }

  function calculateStatus(x, y) {
    return currency(x).divide(y).multiply(100).value
  }

  return {
    emrGoal,
    emrCurrentBalance,
    emrCommitment,
    emrStatus,
    budget,
    remainingBudget,
    budgetStatus,
    budgetSpent,
    freeMoney,
    actualRemainingBudget,
    regularSpendings,
    normalSpendings,
    fixedSpendings,
    emrSpendings,
    freeSpendings,
    goalSpendings,
    currentPayPeriod,
    formatWithCurrency,
  }
}

export {derivedUserData}
