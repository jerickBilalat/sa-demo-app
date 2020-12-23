import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

function AddSpendingFormDialog({modalToggle, doCloseModal}) {
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

export {AddSpendingFormDialog, EmrFundFormDialog, FreeMoneyFormDialog}
