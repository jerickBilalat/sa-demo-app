import * as React from 'react'
import {clientFacade as client} from '../utils/api-client'
import TextField from '@material-ui/core/TextField'
import {NumberFormatCustom} from './lib'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  button: {
    padding: '12px 11px',
  },
  errorMessage: {
    color: 'red',
  },
})

function CreateIntialPayPeriod({data, dispatch}) {
  const [form, setForm] = React.useState({pay: ''})
  const classes = useStyles()
  const [isLoading, setIsLoading] = React.useState(false)
  const [serverErrorMessage, setServerErrorMessage] = React.useState('')
  const [clientValidationErrors, setClientValidationErrors] = React.useState({})
  const onChange = e => {
    const target = e.target
    setForm({...form, [target.name]: target.value})
  }
  const onSubmit = event => {
    event.preventDefault()
    if (!isFormValid()) {
      setClientValidationErrors({
        ...clientValidationErrors,
        pay: 'Pay must not be empty or an amount greater than 0',
      })
      return
    }
    setIsLoading(true)
    client('pay-period/create-initial-pay-period', {
      data: {pay: form.pay},
      token: data.token,
    })
      .then(res => {
        return dispatch({type: 'add-payPeriod', payload: res})
      })
      .catch(err => setServerErrorMessage(err.error.message))
  }

  const isFormValid = () => {
    const formValid = true
    if (form.pay === '' || parseInt(form.pay) < 0) return false
    return formValid
  }

  return (
    <form onSubmit={onSubmit}>
      <p>Start by entering your first pay for your first budgeting period</p>
      {serverErrorMessage ? (
        <p className={classes.errorMessage}>{serverErrorMessage}</p>
      ) : null}
      {clientValidationErrors.pay ? (
        <p className={classes.errorMessage}>{clientValidationErrors.pay}</p>
      ) : null}
      <TextField
        autoFocus
        size="small"
        variant="filled"
        id="pay"
        name="pay"
        label="Enter Pay"
        type="text"
        value={form.pay}
        onChange={onChange}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      <Button size="large" className={classes.button} onClick={onSubmit}>
        {isLoading ? 'Starting...' : 'Start'}
      </Button>
    </form>
  )
}

export {CreateIntialPayPeriod}
