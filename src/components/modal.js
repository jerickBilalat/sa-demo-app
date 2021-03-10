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

import {clientFacade as client} from '../utils/api-client'

import {formatWithCurrency} from './utils'

import {NumberFormatCustom} from './lib'

function SpendingFormDialog({
  doToggleModal,
  spendingToEdit,
  modalToggle,
  dispatch,
  setSpendingToEdit,
  currentPayPeriodID,
  type = 'normal',
  modalTitle = '',
  modalContentText = '',
  editButtonText = 'Edit',
  createButtonText = 'Create',
}) {
  const defaultState = spendingToEdit || {
    description: '',
    amount: '0',
    type,
    payPeriodId: currentPayPeriodID,
  }
  const [spending, setSpending] = React.useState(defaultState)

  const onChange = e => {
    const target = e.target
    if (spendingToEdit) {
      setSpendingToEdit({...spending, [target.name]: target.value})
    }
    setSpending({...spending, [target.name]: target.value})
  }

  const onSubmit = e => {
    e.preventDefault()
    dispatch({type: 'add-spending', payload: spending})
    setSpending(defaultState)
    doToggleModal()
  }

  const doDelete = () => {
    dispatch({type: 'delete-spending', payload: spending})
    setSpending(defaultState)
    doToggleModal()
  }

  return (
    <Dialog
      open={modalToggle}
      onClose={doToggleModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{modalTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{modalContentText}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          name="description"
          type="text"
          value={
            spendingToEdit ? spendingToEdit.description : spending.description
          }
          onChange={e => onChange(e)}
        />
        <TextField
          margin="dense"
          id="amount"
          name="amount"
          label="Cost"
          type="text"
          value={spendingToEdit ? spendingToEdit.amount : spending.amount}
          onChange={e => onChange(e)}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
      </DialogContent>
      <DialogActions>
        {spendingToEdit && (
          <Button onClick={doDelete} color="primary">
            Delete
          </Button>
        )}
        <Button onClick={doToggleModal} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          {spendingToEdit ? editButtonText : createButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function FixedSpendingFormDialog({
  spendingToEdit,
  setSpendingToEdit,
  doToggleModal,
  setCarryOverFixed,
  modalToggle,
  data,
  dispatch,
}) {
  const defaultState = spendingToEdit || {
    description: '',
    amount: '0',
    type: 'fixed',
    payPeriodId: data.payPeriods[data.payPeriods.length - 1]._id,
  }
  const [spending, setSpending] = React.useState(defaultState)

  const onChange = async e => {
    const target = e.target
    spendingToEdit &&
      (await setSpendingToEdit({...spending, [target.name]: target.value}))
    setSpending({...spending, [target.name]: target.value})
  }

  const onSubmit = e => {
    e.preventDefault()
    const body = {...spending}
    const customConfig = {}
    let url = spendingToEdit
      ? 'spending/update-spending'
      : 'spending/create-spending'

    if (spendingToEdit) {
      customConfig.method = 'PUT'
    }

    client(url, {
      data: body,
      token: data.token,
      ...customConfig,
    })
      .then(res => {
        dispatch({type: 'add-spending', payload: res})
        setCarryOverFixed(prevState => [...prevState, res._id])
        setSpending(defaultState)
        return doToggleModal()
      })
      .catch(console.log) // TODO: handle error to render error message
  }

  const doDelete = () => {
    const body = {...spending}
    let url = 'spending/delete-spending'

    client(url, {
      method: 'DELETE',
      data: body,
      token: data.token,
    })
      .then(res => {
        dispatch({type: 'delete-spending', payload: res})
        setSpending(defaultState)
        return doToggleModal()
      })
      .catch(console.log) // TODO: handle error to render error message
  }

  return (
    <Dialog
      open={modalToggle}
      onClose={doToggleModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {spendingToEdit ? 'Edit Fixed Spending' : 'Add Fixed Spending'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Bills. Bills. Bills.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          name="description"
          type="text"
          value={
            spendingToEdit ? spendingToEdit.description : spending.description
          }
          onChange={e => onChange(e)}
        />
        <TextField
          margin="dense"
          id="amount"
          name="amount"
          label="Cost"
          type="text"
          value={spendingToEdit ? spendingToEdit.amount : spending.amount}
          onChange={e => onChange(e)}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
      </DialogContent>
      <DialogActions>
        {spendingToEdit && (
          <Button onClick={doDelete} color="primary">
            Delete
          </Button>
        )}
        <Button onClick={doToggleModal} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          {spendingToEdit ? 'Done' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function CreateGoalFormDialog({
  spendingToEdit,
  setSpendingToEdit,
  doToggleModal,
  setCarryOverGoals,
  modalToggle,
  data,
  dispatch,
}) {
  const defaultState = spendingToEdit || {
    description: '',
    amount: '0',
    type: 'goal',
    payPeriodId: data.payPeriods[data.payPeriods.length - 1]._id,
    goalAmount: '0',
    goalBalance: '0',
  }
  const [spending, setSpending] = React.useState(defaultState)

  const onChange = async e => {
    const target = e.target
    spendingToEdit &&
      (await setSpendingToEdit({...spending, [target.name]: target.value}))
    setSpending({...spending, [target.name]: target.value})
  }
  const onSubmit = e => {
    e.preventDefault()
    const body = {
      ...spending,
    }
    const customConfig = {}
    let url = spendingToEdit
      ? 'spending/update-spending'
      : 'spending/create-spending'

    if (spendingToEdit) {
      customConfig.method = 'PUT'
    }

    client(url, {
      data: body,
      token: data.token,
      ...customConfig,
    })
      .then(res => {
        dispatch({type: 'add-spending', payload: res})
        setCarryOverGoals(prevState => [...prevState, res._id])
        setSpending(defaultState)
        return doToggleModal()
      })
      .catch(console.log) // TODO: handle error to render error message
  }

  const doDelete = () => {
    const body = {...spending}
    let url = 'spending/delete-spending'

    client(url, {
      method: 'DELETE',
      data: body,
      token: data.token,
    })
      .then(res => {
        dispatch({type: 'delete-spending', payload: res})
        setSpending(defaultState)
        return doToggleModal()
      })
      .catch(console.log) // TODO: handle error to render error message
  }

  return (
    <Dialog
      open={modalToggle}
      onClose={doToggleModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {spendingToEdit ? 'Edit Goal' : 'Create Goal'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Set and execute.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          name="description"
          type="text"
          value={
            spendingToEdit ? spendingToEdit.description : spending.description
          }
          onChange={e => onChange(e)}
        />
        <TextField
          margin="dense"
          id="amount"
          name="amount"
          label="Commitment"
          type="text"
          value={spendingToEdit ? spendingToEdit.amount : spending.amount}
          onChange={e => onChange(e)}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
        <TextField
          margin="dense"
          id="goalBalance"
          name="goalBalance"
          label="Current Balance"
          type="text"
          value={
            spendingToEdit ? spendingToEdit.goalBalance : spending.goalBalance
          }
          onChange={e => onChange(e)}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
        <TextField
          margin="dense"
          id="goalAmount"
          name="goalAmount"
          label="Goal Amount"
          type="text"
          value={
            spendingToEdit ? spendingToEdit.goalAmount : spending.goalAmount
          }
          onChange={e => onChange(e)}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
      </DialogContent>
      <DialogActions>
        {spendingToEdit && (
          <Button onClick={doDelete} color="primary">
            Delete
          </Button>
        )}
        <Button onClick={doToggleModal} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          {spendingToEdit ? 'Edit' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function CreateNextPeriodFormDialog({
  fixedSpendings,
  carryOverFixed,
  setCarryOverFixed,
  carryOverGoals,
  setCarryOverGoals,
  goalSpendings,
  remainingBudget,
  prevPayPeriodID,
  emrCurrentBalance,
  modalToggle,
  doCloseModal,
  data,
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
    dispatch({type: 'create-next-period', payload})
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
            Unchecked fixed spendings that does not apply to this period:
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
            Unchecked goals that does not apply to this period:
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
    console.log('form', form)
    e.preventDefault()
    if (defaultState === form) {
      // just close modal
      return doCloseModal()
    }
    const body = {
      numberOfPayPeriodPerMonth: form.numberOfPayPeriodPerMonth,
      emrCommitmentAmount: form.emrCommitmentAmount,
      emrRemainingBalance: form.emrRemainingBalance,
      emrtype: form.emrtype,
    }
    dispatch({type: 'update-user-settings', payload: body})
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
        <DialogContentText>Edit or add funds to Pay Period</DialogContentText>
        <TextField
          margin="dense"
          id="pay"
          name="pay"
          label="Current Funds"
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

export {
  SpendingFormDialog,
  CreateGoalFormDialog,
  FixedSpendingFormDialog,
  CreateNextPeriodFormDialog,
  EditPayPeriodFormDialog,
  EditUserPreferenceDialog,
}
