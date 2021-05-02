import React, { useState } from 'react'
import {
  Container,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { TemporaryDrawer } from './TemporaryDrawer'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    flexGrow: 1,
    backgroundColor: 'rgba(69, 90, 99, 0.5)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appName: {
    display: 'inline-block',
    fontWeight: 600,
    cursor: 'pointer',
    transition: '0.5s ease-in-out',
    '&:hover': {
      boxShadow: 'inset 0 0 0 1px #53ea93',
      borderRadius: 2,
    },
  },
  settingMenuRoot: {
    backgroundColor: 'rgba(200, 70, 60, 0.9)',
  },
  settingMenuItemRoot: {
    color: '#fff',
    '&:hover': {
      color: 'yellow',
    },
  },
}))

export const MenuAppBar = () => {
  const classes = useStyles()
  let history = useHistory()

  const [anchorEl, setAnchorEl] = useState(null)
  const anchorElBool = Boolean(anchorEl)
  const [open, setOpen] = useState(false)

  const handleAppNameClick = (e) => {
    if (e.target.tagName === 'DIV') history.push('/')
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (e) => {
    setAnchorEl(null)

    const id = e.target.id
    if (!!id) {
      switch (id) {
        case '1':
          history.push('/settings')
          break
        default:
      }
    }
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position='static'>
        <Container>
          <Toolbar disableGutters>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant='h6'
              className={classes.title}
              onClick={handleAppNameClick}
            >
              <Box px={1} className={classes.appName}>
                {process.env.REACT_APP_NAME}
              </Box>
            </Typography>

            <div>
              <IconButton
                onClick={handleMenu}
                aria-haspopup='true'
                aria-controls='menu-appbar'
                aria-label='display more actions'
                edge='end'
                color='inherit'
              >
                <MoreVert />
              </IconButton>

              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={anchorElBool}
                onClose={handleClose}
                classes={{ paper: classes.settingMenuRoot }}
              >
                <MenuItem
                  id='1'
                  onClick={(e) => handleClose(e)}
                  classes={{ root: classes.settingMenuItemRoot }}
                >
                  Настройки
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <TemporaryDrawer open={open} setOpen={setOpen} />
    </div>
  )
}
