import currency from 'currency.js'

function filter(spendings) {
  return type => spendings.filter(x => x.type === type)
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

function formatWithCurrency(value) {
  return currency(value).format()
}

function calculateStatus(x, y) {
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
  filter,
  sumOf,
  formatWithCurrency,
  calculateStatus,
  formatIsoDateString,
  convertMontlyValueToPerPeriod,
}
