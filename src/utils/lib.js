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
  const emrCommitment = emrCurrentBalance >= emrGoal ? 0 : emrCommitmentAmount
  const emrStatus = calculateStatus(emrCurrentBalance, emrGoal)

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
  const surplus = payPeriods
    .map(x => x.remainingBudget)
    .reduce((a, b) => currency(a).add(b).value, 0)

  const freeMoney = currency(surplus).subtract(sumOf(freeSpendings)).format()

  const actualRemainingBudget = currency(remainingBudget)
    .subtract(sumOf(freeSpendings))
    .format()

  const regularSpendings = [
    ...normalSpendings,
    ...freeSpendings,
    ...emrSpendings,
  ].sort(sortDatesLatestFirst)

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
  }
}

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
  if (y === 0) return 0
  return currency(x).divide(y).multiply(100).value
}

function formatIsoDateString(isoString) {
  const date = new Date(isoString)
  return date.toUTCString().split(' ').slice(0, 3).join(' ')
}

function convertMontlyValueToPerPeriod(value, payPeriodPerMonth) {
  return currency(value).divide(payPeriodPerMonth).value
}

export {
  derivedUserData,
  formatWithCurrency,
  formatIsoDateString,
  convertMontlyValueToPerPeriod,
  calculateStatus,
}
