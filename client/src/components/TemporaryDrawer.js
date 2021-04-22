import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Explore, Home, Poll } from '@material-ui/icons'
import { useHistory, useLocation } from 'react-router-dom'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
})

export const TemporaryDrawer = ({ open, setOpen }) => {
  const classes = useStyles()
  let history = useHistory()
  let location = useLocation()

  return (
    <div>
      <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
        <div role='presentation' onClick={() => setOpen(false)}>
          <List className={classes.list}>
            <ListItem
              button
              selected={location.pathname === '/'}
              onClick={() => history.push('/')}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary='Главная' />
            </ListItem>
            <ListItem
              button
              selected={location.pathname === '/quotes'}
              onClick={() => history.push('/quotes')}
            >
              <ListItemIcon>
                <Poll />
              </ListItemIcon>
              <ListItemText primary='Квоты' />
            </ListItem>
            <ListItem
              button
              selected={location.pathname === '/routes'}
              onClick={() => history.push('/routes')}
            >
              <ListItemIcon>
                <Explore />
              </ListItemIcon>
              <ListItemText primary='Маршруты' />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  )
}
