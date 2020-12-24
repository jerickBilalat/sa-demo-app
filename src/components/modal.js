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

function EmrFundFormDialog({modalToggle, doCloseModal}) {
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
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={doCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={doCloseModal} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function FreeMoneyFormDialog({modalToggle, doCloseModal}) {
  return (
    <Dialog
      open={modalToggle}
      onClose={doCloseModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Spludge!</DialogTitle>
      <DialogContent>
        <DialogContentText>Treat yourself like royalty</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={doCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={doCloseModal} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function FixedSpendingFormDialog({modalToggle, doCloseModal}) {
  return (
    <Dialog
      open={modalToggle}
      onClose={doCloseModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Fixed Spending</DialogTitle>
      <DialogContent>
        <DialogContentText>Treat yourself like royalty</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={doCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={doCloseModal} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function CreateGoalFormDialog({modalToggle, doCloseModal}) {
  return (
    <Dialog
      open={modalToggle}
      onClose={doCloseModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create a Goal</DialogTitle>
      <DialogContent>
        <DialogContentText>Treat yourself like royalty</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={doCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={doCloseModal} color="primary">
          Subscribe
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
}
