import { Grid, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 'calc(100vh - 96px)',
    position: 'relative',
  },
  titleBox: {
    position: 'absolute',
    top: '15%',
    left: '8%',
    '@media (max-width: 600px)': {
      left: '5%',
    },
  },
  title: {
    fontFamily: 'Conv_Pangolin-Regular',
    fontSize: '1.5rem',
    fontWeight: 700,
    letterSpacing: 2.2,
    color: '#eeec',
    '@media (max-width: 600px)': {
      fontSize: '1.2rem',
    },
  },
  titleDesc: {
    fontFamily: 'Conv_Pangolin-Regular',
    fontSize: '1.2rem',
    fontWeight: 600,
    letterSpacing: 2.2,
    color: '#ff3333ee',
    textAlign: 'right',
    '@media (max-width: 600px)': {
      fontSize: '1rem',
    },
  },
}))

export const Home = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item>
          <Box className={classes.titleBox}>
            <Box className={classes.title}>Тайный покупатель</Box>
            <Box className={classes.titleDesc}>Сервисы</Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}
