import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import {clientFacade as client} from '../utils/api-client'

import {NumberFormatCustom} from './lib'

function AddSpendingFormDialog({modalToggle, doCloseModal, data, dispatch}) {
  const [spending, setSpending] = React.useState({
    description: '',
    amount: '0',
    type: 'normal',
    payPeriodId: data.payPeriods[data.payPeriods.length - 1]._id,
  })
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
      <DialogTitle id="form-dialog-title">Add Speding</DialogTitle>
      <DialogContent>
        <DialogContentText>Spend wisely.</DialogContentText>
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
          Spend
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function EmrFundFormDialog({modalToggle, doCloseModal, data, dispatch}) {
  const [spending, setSpending] = React.useState({
    description: '',
    amount: '0',
    type: 'emr',
    payPeriodId: data.payPeriods[data.payPeriods.length - 1]._id,
  })

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
  const [spending, setSpending] = React.useState({
    description: '',
    amount: '0',
    type: 'free',
    payPeriodId: data.payPeriods[data.payPeriods.length - 1]._id,
  })

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

function FixedSpendingFormDialog({modalToggle, doCloseModal, data, dispatch}) {
  const [spending, setSpending] = React.useState({
    description: '',
    amount: '0',
    type: 'fixed',
    payPeriodId: data.payPeriods[data.payPeriods.length - 1]._id,
  })

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
      <DialogTitle id="form-dialog-title">Add Fixed Spending</DialogTitle>
      <DialogContent>
        <DialogContentText>Bills. Bills. Bills.</DialogContentText>
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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function CreateGoalFormDialog({modalToggle, doCloseModal, data, dispatch}) {
  const [spending, setSpending] = React.useState({
    description: '',
    amount: '0',
    type: 'goal',
    payPeriodId: data.payPeriods[data.payPeriods.length - 1]._id,
    goalAmount: '0',
  })

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
      <DialogTitle id="form-dialog-title">Create Goal</DialogTitle>
      <DialogContent>
        <DialogContentText>Set and execute.</DialogContentText>
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
          label="Commitment"
          type="text"
          value={spending.amount}
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
          value={spending.goalAmount}
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
  const [carryOverGoals, setCarryOverGoals] = React.useState(
    goalSpendings.map(x => x._id),
  )
  const [carryOverFixed, setCarryOverFixed] = React.useState(
    fixedSpendings.map(x => x._id),
  )

  const onChange = e => {
    const target = e.target
    setForm({...form, [target.name]: target.value})
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
      <DialogTitle id="form-dialog-title">Create Goal</DialogTitle>
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
        {goalSpendings.length > 0 ? (
          <DialogContentText>
            Unchecked goals that does not apply to this period:
          </DialogContentText>
        ) : null}
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

export {
  AddSpendingFormDialog,
  EmrFundFormDialog,
  FreeMoneyFormDialog,
  CreateGoalFormDialog,
  FixedSpendingFormDialog,
  CreateNextPeriodFormDialog,
}
