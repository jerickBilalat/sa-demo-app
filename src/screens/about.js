import * as React from 'react'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'
import {Copyright} from '../components/lib'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
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
    height: 240,
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
            {/* Budget Card */}
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper}>
                <h1>section</h1>
              </Paper>
            </Grid>
            {/* Emergency Fund */}
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper}>
                <h1>section</h1>
              </Paper>
            </Grid>
            {/* Spludge Money */}
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper}>
                <h1>section</h1>
              </Paper>
            </Grid>
            {/* Spendings */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h1>section</h1>
              </Paper>
            </Grid>
            {/* Bills */}
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <h1>section</h1>
              </Paper>
            </Grid>
            {/* Goals */}
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <h1>section</h1>
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
