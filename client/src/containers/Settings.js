import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Grid, Box, FormControlLabel, Checkbox } from '@material-ui/core'

const CheckBox = withStyles({
  root: {
    color: '#aaa',
    '&$checked': {
      color: '#fff',
    },
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />)

const useStyles = makeStyles({
  settingsBox: {
    backgroundColor: '#333c',
    border: '2px solid #ccc2',
    borderRadius: 5,
    color: '#ccc',
    padding: 10,
  },
})

export const Settings = (e) => {
  const classes = useStyles()
  const [setting, setSetting] = useState({ isAutoCopy: true })

  const handleChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setSetting({ ...setting, [e.target.name]: value })
  }

  return (
    <div>
      <Box className={classes.settingsBox}>
        <Grid container spacing={1}>
          <Grid item>
            <FormControlLabel
              control={
                <CheckBox
                  color='secondary'
                  checked={setting.isAutoCopy}
                  name='isAutoCopy'
                  onClick={handleChange}
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              }
              label='Автокопирование результатов в буфер обмена (при наличии поддержки в браузере)'
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
