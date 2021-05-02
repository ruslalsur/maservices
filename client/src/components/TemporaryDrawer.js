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
    width: 200,
  },
  drawerRoot: {
    backgroundColor: 'rgba(20, 30, 30, 0.8)',
    color: '#eeeeee',
  },
  iconRoot: {
    color: '#eeeeeecc',
  },
  listItemSelected: {
    color: 'yellow',
  },
})

export const TemporaryDrawer = ({ open, setOpen }) => {
  const classes = useStyles()
  let history = useHistory()
  let location = useLocation()

  return (
    <div>
      <Drawer
        classes={{ paper: classes.drawerRoot }}
        anchor='left'
        open={open}
        onClose={() => setOpen(false)}
      >
        <div role='presentation' onClick={() => setOpen(false)}>
          <List className={classes.list}>
            <ListItem
              button
              selected={location.pathname === '/'}
              onClick={() => history.push('/')}
              classes={{
                selected: classes.listItemSelected,
              }}
            >
              <ListItemIcon>
                <Home classes={{ root: classes.iconRoot }} />
              </ListItemIcon>
              <ListItemText primary='Главная' />
            </ListItem>
            <ListItem
              button
              selected={location.pathname === '/quotes'}
              onClick={() => history.push('/quotes')}
              classes={{
                selected: classes.listItemSelected,
              }}
            >
              <ListItemIcon>
                <Poll classes={{ root: classes.iconRoot }} />
              </ListItemIcon>
              <ListItemText primary='Квоты' />
            </ListItem>
            <ListItem
              button
              selected={location.pathname === '/routes'}
              onClick={() => history.push('/routes')}
              classes={{
                selected: classes.listItemSelected,
              }}
            >
              <ListItemIcon>
                <Explore
                  classes={{
                    root: classes.iconRoot,
                  }}
                />
              </ListItemIcon>
              <ListItemText primary='Маршруты' />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  )
}
