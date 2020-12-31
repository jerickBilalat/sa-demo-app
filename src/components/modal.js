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

function AddSpendingFormDialog({
  spendingToEdit,
  modalToggle,
  doCloseModal,
  data,
  dispatch,
}) {
  const defaultState = spendingToEdit || {
    description: '',
    amount: '0',
    type: 'normal',
    payPeriodId: data.payPeriods[data.payPeriods.length - 1]._id,
  }
  const [spending, setSpending] = React.useState(defaultState)
  const onChange = e => {
    const target = e.target
    setSpending({...spending, [target.name]: target.value})
  }
  const onSubmit = e => {
    e.preventDefault()
    const body = {...spending}

    client('spending/create-spending', {
      data: body,
      token: data.token,
    })
      .then(res => {
        dispatch({type: 'add-spending', payload: res})
        setSpending(defaultState)
        return doCloseModal()
      })
      .catch(console.log) // TODO: handle error to render error message
  }
  return (
    <Dialog
      open={modalToggle}
      onClose={doCloseModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {spendingToEdit ? 'Edit Spending' : 'Add Spending'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Spend wisely.</DialogContentText>
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
        <Button onClick={doCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Spend
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function EmrFundFormDialog({modalToggle, doCloseModal, data, dispatch}) {
  const defaultState = {
    description: '',
    amount: '0',
    type: 'emr',
    payPeriodId: data.payPeriods[data.payPeriods.length - 1]._id,
  }
  const [spending, setSpending] = React.useState(defaultState)

  const onChange = e => {
    const target = e.target
    setSpending({...spending, [target.name]: target.value})
  }
  const onSubmit = e => {
    e.preventDefault()
    const body = {...spending}

    client('spending/create-spending', {
      data: body,
      token: data.token,
    })
      .then(res => {
        dispatch({type: 'add-spending', payload: res})
        setSpending(defaultState)
        return doCloseModal()
      })
      .catch(console.log) // TODO: handle error to render error message
  }

  return (
    <Dialog
      open={modalToggle}
      onClose={doCloseModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Use Emergency Fund</DialogTitle>
      <DialogContent>
        <DialogContentText>I got you covered!</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          name="description"
          type="text"
          value={spending.description}
          onChange={e => onChange(e)}
        />
        <TextField
          margin="dense"
          id="amount"
          name="amount"
          label="Cost"
          type="text"
          value={spending.amount}
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
          Use Fund
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function FreeMoneyFormDialog({modalToggle, doCloseModal, data, dispatch}) {
  const defaultState = {
    description: '',
    amount: '0',
    type: 'free',
    payPeriodId: data.payPeriods[data.payPeriods.length - 1]._id,
  }
  const [spending, setSpending] = React.useState(defaultState)
  const onChange = e => {
    const target = e.target
    setSpending({...spending, [target.name]: target.value})
  }
  const onSubmit = e => {
    e.preventDefault()
    const body = {...spending}

    client('spending/create-spending', {
      data: body,
      token: data.token,
    })
      .then(res => {
        dispatch({type: 'add-spending', payload: res})
        setSpending(defaultState)
        return doCloseModal()
      })
      .catch(console.log) // TODO: handle error to render error message
  }

  return (
    <Dialog
      open={modalToggle}
      onClose={doCloseModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Spludge!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Where Guilt Free spending happens.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          name="description"
          type="text"
          value={spending.description}
          onChange={e => onChange(e)}
        />
        <TextField
          margin="dense"
          id="amount"
          name="amount"
          label="Cost"
          type="text"
          value={spending.amount}
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
          Spludge!
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function FixedSpendingFormDialog({
  spendingToEdit,
  setCarryOverFixed,
  modalToggle,
  doCloseModal,
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

  const onChange = e => {
    const target = e.target
    setSpending({...spending, [target.name]: target.value})
  }
  const onSubmit = e => {
    e.preventDefault()
    const body = {...spending}

    client('spending/create-spending', {
      data: body,
      token: data.token,
    })
      .then(res => {
        dispatch({type: 'add-spending', payload: res})
        return res
      })
      .then(res => {
        setCarryOverFixed(prevState => [...prevState, res._id])
        setSpending(defaultState)
        return doCloseModal()
      })
      .catch(console.log) // TODO: handle error to render error message
  }
  return (
    <Dialog
      open={modalToggle}
      onClose={doCloseModal}
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
        <Button onClick={doCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function CreateGoalFormDialog({
  spendingToEdit,
  setCarryOverGoals,
  modalToggle,
  doCloseModal,
  data,
  dispatch,
}) {
  const defaultState = spendingToEdit || {
    description: '',
    amount: '0',
    type: 'goal',
    payPeriodId: data.payPeriods[data.payPeriods.length - 1]._id,
    goalAmount: '0',
  }
  const [spending, setSpending] = React.useState(defaultState)

  const onChange = e => {
    const target = e.target
    setSpending({...spending, [target.name]: target.value})
  }
  const onSubmit = e => {
    e.preventDefault()
    const body = {
      ...spending,
      goalBalance: spending.amount,
      goalAmount: spending.goalAmount,
    }

    client('spending/create-spending', {
      data: body,
      token: data.token,
    })
      .then(res => {
        dispatch({type: 'add-spending', payload: res})
        return res
      })
      .then(res => {
        setCarryOverGoals(prevState => [...prevState, res._id])
        setSpending(defaultState)
        doCloseModal()
      })
      .catch(console.log) // TODO: handle error to render error message
  }
  return (
    <Dialog
      open={modalToggle}
      onClose={doCloseModal}
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
        <Button onClick={doCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Create
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
}) {
  // TODO: normalize the input into the right format of type string
  const [form, setForm] = React.useState({pay: ''})

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
    client('pay-period/create-pay-period', {
      data: {
        pay: form.pay,
        remainingBudget,
        continuedFixedSpendings: carryOverFixed,
        continuedGoals: carryOverGoals,
        prevPayPeriodID,
        emrCurrentBalance,
      },
      token: data.token,
    })
      .then(() => {
        window.location.assign(window.location.origin)
      })
      .catch(error => {
        // TODO: come up with a better centralized error
        throw new Error(error)
      })
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
          Create
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
}) {
  const defaultState = currentPayPeriod.pay
  const [pay, setPay] = React.useState(defaultState)

  const onChange = e => {
    const target = e.target
    setPay(target.value)
  }
  const onSubmit = e => {
    e.preventDefault()
    if (defaultState === pay) {
      return doCloseModal()
    }
    const body = {
      remainingBudget: undefined,
      payPeriodID: currentPayPeriod._id,
      pay,
    }

    client('pay-period/update-pay-period', {
      data: body,
      token: data.token,
      method: 'PUT',
    })
      .then(() => {
        window.location.assign(window.location.origin)
      })
      .catch(console.log) // TODO: handle error to render error message
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
          value={pay}
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
  AddSpendingFormDialog,
  EmrFundFormDialog,
  FreeMoneyFormDialog,
  CreateGoalFormDialog,
  FixedSpendingFormDialog,
  CreateNextPeriodFormDialog,
  EditPayPeriodFormDialog,
}
