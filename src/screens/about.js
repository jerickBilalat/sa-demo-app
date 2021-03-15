import * as React from 'react'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'
import {Copyright} from '../components/lib'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import Link from '@material-ui/core/Link'
import {Link as RouterLink} from 'react-router-dom'

import {NumberFormatCustom} from '../components/lib'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 463,
  },
}))

const About = () => {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Jumbotron */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography
                  component="h1"
                  variant="h3"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  How it works
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  It is usaully best to play around with the application by
                  going to the dashboard and decide if it is worth learning more
                  about it.
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Link component={RouterLink} to={'/dashboard'}>
                        <Button variant="contained" color="primary">
                          Go to Dashboard
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        href="https://github.com/jerickBilalat/sa-demo-app"
                      >
                        Source Code for nerds
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Grid>
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography
                  component="h2"
                  variant="h4"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Learn More
                </Typography>
              </Paper>
            </Grid> */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography
                  component="h3"
                  variant="h5"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  How to use the app
                </Typography>
                <Typography
                  align="center"
                  component="p"
                  variant="caption"
                  style={{color: 'red'}}
                >
                  This section is still work in progress but has enough
                  information to get you started.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={fixedHeightPaper}>
                <Typography
                  component="h3"
                  variant="h6"
                  align="left"
                  color="textPrimary"
                  gutterBottom
                >
                  Let us start by assuming...
                </Typography>
                <Typography align="left" color="textSecondary" paragraph>
                  You get paid every <b>2</b> weeks
                </Typography>
                <Typography align="left" color="textSecondary" paragraph>
                  You have saved up $1,000 of <b>Emergency Fund</b>
                </Typography>
                <Typography align="left" color="textSecondary" paragraph>
                  You want to <b>commit</b> funding it <b>$50</b> from every
                  paycheck
                </Typography>
                <Typography align="left" color="textSecondary" paragraph>
                  In a situation where you lost your job or any source of
                  income, you concluded it would take you at most{' '}
                  <b>6 months</b> to get back to your normal income flow by
                  maybe getting a new job.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper className={fixedHeightPaper}>
                <Typography component="h3" variant="h6">
                  According to these assumptions your settings would look like
                  this
                </Typography>
                <Typography component="p" variant="caption">
                  Adjust settings by clicking the settings tool bar found at the
                  top of the dashboard.
                </Typography>

                <form className={classes.form} noValidate>
                  <TextField
                    disabled
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
                    value={2}
                  />
                  <TextField
                    disabled
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
                    value={'1000'}
                  />
                  <TextField
                    disabled
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
                    value={'50'}
                  />
                  <TextField
                    disabled
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
                    value={6}
                  />
                </form>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography
                  component="h3"
                  variant="h6"
                  align="left"
                  color="textPrimary"
                  gutterBottom
                >
                  When you are ready for your next period
                </Typography>
                <Typography align="left" color="textSecondary" paragraph>
                  Click on the <b>NEXT PERIOD</b> button found in the toolbar on
                  top of the your Dashboard.
                </Typography>
                <Button color="default" variant="outlined" size="small">
                  NEXT PERIDOD &#62;
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography
                  component="h3"
                  variant="h6"
                  align="left"
                  color="textPrimary"
                  gutterBottom
                >
                  Funding your budget
                </Typography>
                <Typography
                  component="p"
                  variant="caption"
                  style={{color: 'red'}}
                >
                  DISCLAIMER: There is no transfering of actual money from you
                  bank is ever going to happen in the applications nor will it
                  ever ask you to connect to your bank or any kind of third
                  party financial institution.
                </Typography>
                <Typography align="left" color="textSecondary" paragraph>
                  Click on the <b>Edit Period</b> button found in the toolbar on
                  top of the your Dashboard.
                </Typography>
                <Button
                  color="default"
                  variant="outlined"
                  size="small"
                  startIcon={<EditIcon />}
                >
                  Edit Period
                </Button>
                <Typography align="left" color="textSecondary" paragraph>
                  You can enter your pay check amount or the total of your
                  income in the current budgeting period
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography
                  component="h3"
                  variant="h5"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Core Concepts
                </Typography>
                <Typography
                  align="center"
                  component="p"
                  variant="caption"
                  style={{color: 'red'}}
                >
                  Coming soon.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  )
}

export {About}
