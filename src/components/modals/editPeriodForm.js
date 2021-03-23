import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import {NumberFormatCustom} from '../lib'

function EditPayPeriodFormDialog({
  modalToggle,
  doCloseModal,
  currentPayPeriod,
  data,
  dispatch,
}) {
  const defaultState = {pay: currentPayPeriod.pay}
  const [form, setForm] = React.useState(defaultState)

  const onChange = e => {
    const target = e.target
    setForm({[target.name]: target.value})
  }
  const onSubmit = e => {
    e.preventDefault()
    if (defaultState === form) {
      return doCloseModal()
    }
    const body = {
      payPeriodID: currentPayPeriod._id,
      pay: form.pay,
    }

    dispatch({type: 'edit-period', payload: body})
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
