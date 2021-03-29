import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {v4 as uuidv4} from 'uuid'
import currency from 'currency.js'

import {NumberFormatCustom} from '../lib'
import actions from '../../utils/actions'

function SpendingFormDialog({
  doToggleModal,
  spendingToEdit,
  modalToggle,
  dispatch,
  setSpendingToEdit,
  currentPayPeriodID,
  userData,
  setCarryOverFixed = () => {
    console.error(
      'Please provide setCarryOverFixed and do not use deafult callback',
    )
  },
  setCarryOverGoals = () => {
    console.error(
      'Please provide setCarryOverGoals and do not use deafult callback',
    )
  },
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
    refUser: userData.userID,
    goalAmount: '0',
    goalBalance: '0',
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
    const {
      description,
      refUser,
      amount,
      type,
      _id,
      createdAt,
      refPayPeriods,
      goalAmount,
      goalBalance,
    } = spending
    let payload = {
      description,
      amount,
      _id: _id || uuidv4(),
      type,
      refUser,
      refPayPeriods: refPayPeriods ? refPayPeriods : [currentPayPeriodID],
      createdAt: createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (type === 'fixed') {
      setCarryOverFixed(prevState => [...prevState, payload._id])
    } else if (type === 'goal') {
      payload = {
        ...payload,
        goalAmount,
        goalBalance: currency(goalBalance).add(amount).format(),
      }
      setCarryOverGoals(prevState => [...prevState, payload._id])
    }

    dispatch({type: actions.ADD_SPENDING, payload})
    setSpending(defaultState)
    doToggleModal()
  }

  const doDelete = () => {
    dispatch({type: actions.DELETE_SPENDING, payload: spending})
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
        {type === 'goal' && (
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
        )}
        {type === 'goal' && (
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
        )}
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

export {SpendingFormDialog}
