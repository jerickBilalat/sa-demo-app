import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import {formatWithCurrency} from '../../utils/lib'

import {NumberFormatCustom} from '../lib'
import actions from '../../utils/actions'

function CreateNextPeriodFormDialog({
  fixedSpendings,
  carryOverFixed,
  setCarryOverFixed,
  carryOverGoals,
  setCarryOverGoals,
  goalSpendings,
  remainingBudget,
  emrCurrentBalance,
  modalToggle,
  doCloseModal,
  dispatch,
}) {
  // TODO: normalize the input into the right format of type string
  const [form, setForm] = React.useState({pay: ''})
  const [isLoading, setIsLoading] = React.useState(false)
  const [serverErrorMessage] = React.useState('')
  const [clientValidationErrors, setClientValidationErrors] = React.useState({
    pay: '',
  })

  const onChange = e => {
    const target = e.target
    setForm({...form, [target.name]: target.value})
  }

  const onCheckboxChange = (collection, spending, set) => {
    if (collection.includes(spending._id)) {
      return set([...collection.filter(id => id !== spending._id)])
    }
    return set([...collection, spending._id])
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
    const payload = {
      pay: form.pay,
      remainingBudget,
      continuedFixedSpendings: carryOverFixed,
      continuedGoals: carryOverGoals,
      emrCurrentBalance,
    }
    dispatch({type: actions.CREATE_PERIOD, payload})
    setIsLoading(false)
    doCloseModal()
  }

  const isFormValid = () => {
    const formValid = true
    if (form.pay === '' || parseInt(form.pay) < 1) return false
    return formValid
  }

  return (
    <Dialog
      open={modalToggle}
      onClose={doCloseModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create Period</DialogTitle>
      <DialogContent>
        <DialogContentText>How much is your starting income?</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="pay"
          name="pay"
          helperText={
            clientValidationErrors.pay !== ''
              ? clientValidationErrors.pay
              : serverErrorMessage !== ''
              ? serverErrorMessage
              : ''
          }
          error={clientValidationErrors.pay !== '' || serverErrorMessage !== ''}
          label="Income"
          type="text"
          value={form.pay}
          onChange={onChange}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
        {fixedSpendings.length > 0 ? (
          <DialogContentText>
            Uncheck fixed spendings that does not apply to this period:
          </DialogContentText>
        ) : null}
        <FormGroup>
          {fixedSpendings.map(spending => (
            <FormControlLabel
              key={spending._id}
              control={
                <Checkbox
                  checked={carryOverFixed.includes(spending._id)}
                  onChange={() =>
                    onCheckboxChange(
                      carryOverFixed,
                      spending,
                      setCarryOverFixed,
                    )
                  }
                  name={spending.description}
                />
              }
              label={`${spending.description} ${formatWithCurrency(
                spending.amount,
              )}`}
            />
          ))}
        </FormGroup>
        {goalSpendings.length > 0 ? (
          <DialogContentText>
            Uncheck goals that does not apply to this period:
          </DialogContentText>
        ) : null}
        <FormGroup>
          {goalSpendings.map(spending => (
            <FormControlLabel
              key={spending._id}
              control={
                <Checkbox
                  checked={carryOverGoals.includes(spending._id)}
                  onChange={() =>
                    onCheckboxChange(
                      carryOverGoals,
                      spending,
                      setCarryOverGoals,
                    )
                  }
                  name={spending.description}
                />
              }
              label={`${spending.description} commiting ${formatWithCurrency(
                spending.amount,
              )} per period`}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={doCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export {CreateNextPeriodFormDialog}
