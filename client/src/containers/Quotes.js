import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box, FilledInput } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

export const Quotes = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item>
          <Box>
            <FilledInput />
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}
