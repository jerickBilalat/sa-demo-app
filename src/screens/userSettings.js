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

const UserSettings = ({currentUserData, freeMoneyBalance = '0.00'}) => {
  const classes = useStyles()
  const [isLoading, setIsLoading] = React.useState(false)
  const [errors, setErrors] = React.useState({serverError: ''})

  const [user, setUser] = React.useState({...currentUserData, freeMoneyBalance})
  // averagePayPerPeriod: "0.00"
  // currentSpendings: []
  // emrCommitmentAmount: "0.00"
  // emrRemainingBalance: "0.00"
  // emrtype: 6
  // numberOfPayPeriodPerMonth: 2
  // payPeriods: [{…}]
  // userID: "600ecaa999641208b762f70c"
  // username: "sssfsdfsss"
  // token

  const onChange = event => {
    setUser({...user, [event.target.name]: event.target.value})
  }

  const onSubmit = event => {
    event.preventDefault()
    setIsLoading(true)
    // TODO call api to modify
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
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Create New Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={user.password}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
          />
          <TextField
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
            variant="outlined"
            margin="normal"
            fullWidth
            id="emrRemainingBalance"
            label="Current Emergency Fund Balance"
            name="emrRemainingBalance"
            autoComplete="emrRemainingBalance"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            value={user.emrRemainingBalance}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="freeMoneyBalance"
            label="Current Spludge Money balance"
            name="freeMoneyBalance"
            autoComplete="freeMoneyBalance"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            value={user.freeMoneyBalance}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="emrCommitmentAmount"
            label="Current Amount transfered to Emergency Fund every period"
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
            disabled={isLoading}
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

// utils
function filter(spendings) {
  return type => spendings.filter(x => x.type === type)
}

export {UserSettings}
