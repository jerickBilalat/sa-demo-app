import * as React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import EmojiEmotions from '@material-ui/icons/EmojiEmotions'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {clientFacade as client} from '../utils/api-client'

import {NumberFormatCustom} from '../components/lib'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const defaultFormErrorState = {
  username: [],
  numberOfPayPeriodPerMonth: [],
  emrRemainingBalance: [],
  emrtype: [],
  emrCommitmentAmount: [],
  password: [],
  confirmPassword: [],
}

const UserSettings = ({currentUserData}) => {
  const classes = useStyles()
  const {
    username,
    numberOfPayPeriodPerMonth,
    emrRemainingBalance,
    emrtype,
    emrCommitmentAmount,
  } = currentUserData

  const defaultState = {
    username,
    numberOfPayPeriodPerMonth,
    emrRemainingBalance,
    emrtype,
    emrCommitmentAmount,
    password: '',
    confirmPassword: '',
  }

  const [user, setUser] = React.useState(defaultState)
  const [formErrors, setFormErrors] = React.useState(defaultFormErrorState)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isFormDirty, setIsFormDirty] = React.useState(false)
  const [errors, setErrors] = React.useState({serverError: ''})

  function isFormValid(form) {
    let formErrors = {
      username: [],
      numberOfPayPeriodPerMonth: [],
      emrRemainingBalance: [],
      emrtype: [],
      emrCommitmentAmount: [],
      password: [],
      confirmPassword: [],
    }
    let errorCount = 0
    // TODO: validation logic
    for (let field in form) {
      if (field !== 'password' && field !== 'confirmPassword' && !form[field]) {
        formErrors[field].push('Can not be empty')
        errorCount++
      }
      if (field === 'username' && form[field].length < 6) {
        formErrors[field].push('Must have 6 or more characters')
        errorCount++
      }
    }

    // if user is intending to change password
    if (form.password) {
      if (form.password !== form.confirmPassword) {
        formErrors.confirmPassword.push('Must match new entered password')
        errorCount++
      }
      if (form.password.length < 6) {
        formErrors.password.push('Must have 6 or more characters')
        errorCount++
      }
    }

    if (errorCount > 0) {
      setFormErrors({...formErrors})
      return false
    }

    return true
  }

  React.useEffect(() => {
    for (let key in user) {
      if (user[key].toString() !== defaultState[key].toString()) {
        setIsFormDirty(true)
        break
      } else {
        setIsFormDirty(false)
      }
    }
  }, [user, defaultState])

  const onChange = event => {
    const name = event.target.name
    let value = event.target.value
    setUser({
      ...user,
      [name]: value,
    })
  }

  const onSubmit = event => {
    event.preventDefault()
    setIsLoading(true)
    if (!isFormValid(user)) {
      setIsLoading(false)
      return
    }

    let body
    for (let key in defaultState) {
      if (defaultState[key] !== user[key]) {
        body = {...body, [key]: user[key]}
      }
    }

    client('auth/update_user_settings', {
      data: {...body},
      token: currentUserData.token,
      method: 'PUT',
    })
      .then(token => {
        window.localStorage.setItem('token', token)
        setIsLoading(false)
        window.location.assign(window.location.origin)
      })
      .catch(error => {
        setIsLoading(false)
        setErrors({...errors, serverError: error.message})
      })
  }

  function getErrorText(field) {
    return formErrors[field].length > 0 ? formErrors[field].join(', ') : null
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EmojiEmotions />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Settings
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Edit User Name"
            name="username"
            autoComplete="username"
            value={user.username}
            onChange={onChange}
            error={formErrors.username.length > 0 ? true : false}
            helperText={getErrorText('username')}
          />
          <TextField
            error={formErrors.password.length > 0 ? true : false}
            helperText={getErrorText('password')}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Create New Password"
            type="password"
            id="password"
            value={user.password}
            onChange={onChange}
          />
          <TextField
            error={formErrors.confirmPassword.length > 0 ? true : false}
            helperText={getErrorText('confirmPassword')}
            variant="outlined"
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            id="confirmPassword"
            value={user.confirmPassword}
            onChange={onChange}
          />
          <TextField
            error={
              formErrors.numberOfPayPeriodPerMonth.length > 0 ? true : false
            }
            helperText={getErrorText('numberOfPayPeriodPerMonth')}
            variant="outlined"
            type="number"
            margin="normal"
            fullWidth
            id="numberOfPayPeriodPerMonth"
            label="Number of Pay Period per month"
            name="numberOfPayPeriodPerMonth"
            InputLabelProps={{
              shrink: true,
            }}
            value={user.numberOfPayPeriodPerMonth}
            onChange={onChange}
          />
          <TextField
            error={formErrors.emrCommitmentAmount.length > 0 ? true : false}
            helperText={getErrorText('emrCommitmentAmount')}
            variant="outlined"
            margin="normal"
            fullWidth
            id="emrCommitmentAmount"
            label="Amount transfered to Emergency Fund every period"
            name="emrCommitmentAmount"
            autoComplete="emrCommitmentAmount"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            value={user.emrCommitmentAmount}
            onChange={onChange}
          />
          <TextField
            error={formErrors.emrtype.length > 0 ? true : false}
            helperText={getErrorText('emrtype')}
            variant="outlined"
            type="number"
            margin="normal"
            fullWidth
            id="emrtype"
            label="Emergency Fund Duration (in months)"
            name="emrtype"
            InputLabelProps={{
              shrink: true,
            }}
            value={user.emrtype}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isFormDirty}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
          {errors.serverError && (
            <p style={{color: 'red'}}>Server error - {errors.serverError}</p>
          )}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export {UserSettings}
