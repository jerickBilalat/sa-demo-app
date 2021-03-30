import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import {NumberFormatCustom} from '../lib'
import actions from '../../utils/actions'
import {getErrorText, isFormValid} from '../../utils/formValidation'

function EditPayPeriodFormDialog({
  modalToggle,
  doCloseModal,
  currentPayPeriod,
  dispatch,
}) {
  const defaultState = {pay: currentPayPeriod.pay}
  const defaultFormErrors = {
    pay: [],
  }
  const [form, setForm] = React.useState(defaultState)
  const [formValidationError, setFormValidationError] = React.useState(
    defaultFormErrors,
  )

  const onChange = e => {
    const target = e.target
    setForm({[target.name]: target.value})
  }
  const onSubmit = e => {
    e.preventDefault()
    if (!isFormValid(form, defaultFormErrors, setFormValidationError)) return
    if (defaultState === form) {
      return doCloseModal()
    }
    const body = {
      payPeriodID: currentPayPeriod._id,
      pay: form.pay,
    }

    dispatch({type: actions.MODIFY_PERIOD, payload: body})
    doCloseModal()
  }

  return (
    <Dialog
      open={modalToggle}
      onClose={doCloseModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Period</DialogTitle>
      <DialogContent>
        <TextField
          error={formValidationError.pay.length > 0 ? true : false}
          helperText={getErrorText(formValidationError, 'pay')}
          margin="dense"
          id="pay"
          name="pay"
          label="Income"
          type="text"
          value={form.pay}
          onChange={e => onChange(e)}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={doCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export {EditPayPeriodFormDialog}
