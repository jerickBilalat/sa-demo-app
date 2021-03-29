import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import {NumberFormatCustom} from '../lib'
import actions from '../../utils/actions'

function EditUserPreferenceDialog({
  userData,
  dispatch,
  modalToggle,
  doCloseModal,
}) {
  const {
    numberOfPayPeriodPerMonth,
    emrCommitmentAmount,
    emrRemainingBalance,
    emrtype,
  } = userData
  const defaultState = {
    numberOfPayPeriodPerMonth,
    emrCommitmentAmount,
    emrRemainingBalance,
    emrtype,
  }
  const [form, setForm] = React.useState(defaultState)

  const onChange = e => {
    const target = e.target
    setForm({...form, [target.name]: target.value})
  }
  const onSubmit = e => {
    e.preventDefault()
    if (defaultState === form) {
      // just close modal
      return doCloseModal()
    }
    const body = {
      numberOfPayPeriodPerMonth: parseInt(form.numberOfPayPeriodPerMonth),
      emrCommitmentAmount: form.emrCommitmentAmount,
      emrRemainingBalance: form.emrRemainingBalance,
      emrtype: parseInt(form.emrtype),
    }
    dispatch({type: actions.UPDATE_USER_SETTINGS, payload: body})
    doCloseModal()
  }

  return (
    <Dialog
      open={modalToggle}
      onClose={doCloseModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Settings</DialogTitle>
      <DialogContent>
        <DialogContentText>All fields are required</DialogContentText>
        <TextField
          variant="outlined"
          type="number"
          margin="normal"
          fullWidth
          required
          id="numberOfPayPeriodPerMonth"
          label="Number of budget period per month"
          name="numberOfPayPeriodPerMonth"
          InputLabelProps={{
            shrink: true,
          }}
          value={form.numberOfPayPeriodPerMonth}
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="emrRemainingBalance"
          label="How much is your current Emergency Fund?"
          name="emrRemainingBalance"
          autoComplete="emrRemainingBalance"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
          value={form.emrRemainingBalance}
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="emrCommitmentAmount"
          label="How much do you want to transfer to Emergency Fund every budget period?"
          helperText="5%-10% of your current budget period fund is recommended"
          name="emrCommitmentAmount"
          autoComplete="emrCommitmentAmount"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
          value={form.emrCommitmentAmount}
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          type="number"
          margin="normal"
          required
          fullWidth
          id="emrtype"
          label="If you lost your job, you might be unemployed for how many months?"
          name="emrtype"
          InputLabelProps={{
            shrink: true,
          }}
          value={form.emrtype}
          onChange={onChange}
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

export {EditUserPreferenceDialog}
