import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import EmojiEmotions from '@material-ui/icons/EmojiEmotions'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

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

function SignIn({login, setToggleRegister}) {
  const classes = useStyles()
  const [credentials, setCrendentials] = React.useState({
    username: '',
    password: '',
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const [serverErrorMessage, setErrorMessage] = React.useState('')

  const onChange = event => {
    setCrendentials({...credentials, [event.target.name]: event.target.value})
  }

  const onSubmit = event => {
    event.preventDefault()
    setIsLoading(true)
    login(credentials)
      .then(() => setIsLoading(false))
      .catch(err => {
        setErrorMessage(err.error.message)
        setIsLoading(false)
      }) // TODO: add handler for login error, might have to reffer to bookshelf app
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <p style={{color: 'red'}}>{serverErrorMessage}</p>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={credentials.username}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
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
            {isLoading ? 'Sining in...' : 'Sign In'}
          </Button>
          <Grid container>
            <Grid item xs>
              Forgot password? <br /> Contact Admin
            </Grid>
            <Grid item>
              <Link
                component="button"
                onClick={() => setToggleRegister(true)}
                variant="body2"
              >
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

function Register({register, setToggleRegister}) {
  const classes = useStyles()
  const [isLoading, setIsLoading] = React.useState(false)
  const [errors, setErrors] = React.useState({serverError: ''})

  // TODO: remove averagePayPeriod but first make sure to remove it in the server
  const [user, setUser] = React.useState({
    username: '',
    password: '',
    emrRemainingBalance: '0.00',
    emrCommitmentAmount: '0.00',
    numberOfPayPeriodPerMonth: 2,
    emrtype: 6,
    averagePayPerPeriod: '0.00',
    accessCode: '',
  })

  const onChange = event => {
    setUser({...user, [event.target.name]: event.target.value})
  }

  const onSubmit = event => {
    event.preventDefault()
    setIsLoading(true)
    register(user)
      .then(() => setIsLoading(false))
      .catch(err => {
        setErrors({...errors, serverError: err.error.message})
        setIsLoading(false)
      }) // TODO: add handler for register error, might have to reffer to bookshelf app
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EmojiEmotions />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={user.username}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={user.password}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            type="number"
            margin="normal"
            required
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
            required
            fullWidth
            id="emrRemainingBalance"
            label="How much is your current Emergency Fund?"
            name="emrRemainingBalance"
            autoComplete="emrRemainingBalance"
            InputLabelProps={{
              shrink: true,
            }}
            value={user.emrRemainingBalance}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="emrCommitmentAmount"
            label="How much do you want to transfer to Emergency Fund every pay period?"
            name="emrCommitmentAmount"
            autoComplete="emrCommitmentAmount"
            InputLabelProps={{
              shrink: true,
            }}
            value={user.emrCommitmentAmount}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            type="number"
            margin="normal"
            required
            fullWidth
            id="emrtype"
            label="If you lost your job, you might be unemployed for how many months"
            name="emrtype"
            InputLabelProps={{
              shrink: true,
            }}
            value={user.emrtype}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="accessCode"
            label="Access Code"
            name="accessCode"
            autoComplete="accessCode"
            value={user.accessCode}
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
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
          {errors.serverError && (
            <p style={{color: 'red'}}>Server error - {errors.serverError}</p>
          )}
          <Grid container>
            <Grid item>
              <Link
                component="button"
                onClick={() => setToggleRegister(false)}
                variant="body2"
              >
                {'Already have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

const UnAuthenticatedApp = ({login, register}) => {
  const [toggleRegister, setToggleRegister] = React.useState(false)
  return toggleRegister ? (
    <Register register={register} setToggleRegister={setToggleRegister} />
  ) : (
    <SignIn login={login} setToggleRegister={setToggleRegister} />
  )
}

export {UnAuthenticatedApp}
