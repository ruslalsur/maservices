import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box, FormControlLabel } from '@material-ui/core'
import Switch from '../components/Switch.js'

const useStyles = makeStyles({
  settingsBox: {
    backgroundColor: '#333c',
    border: '2px solid #ccc2',
    borderRadius: 5,
    color: '#ccc',
    padding: 10,
  },
  settingBox: {
    margin: '7px 20px 7px 20px',
  },
  label: {
    marginLeft: 15,
  },
})

export const Settings = (e) => {
  const classes = useStyles()
  const [setting, setSetting] = useState({ autoCopy: true })

  const handleChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setSetting({ ...setting, [e.target.name]: value })
  }

  return (
    <div>
      <Box className={classes.settingsBox}>
        <Grid container spacing={1} direction='column'>
          <Grid item>
            <Box className={classes.settingBox}>
              <FormControlLabel
                classes={{ label: classes.label }}
                control={
                  <Switch
                    name='autoCopy'
                    checked={setting.autoCopy}
                    onChange={handleChange}
                  />
                }
                label='Автокопирование результатов в буфер обмена (при наличии поддержки в браузере)'
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
