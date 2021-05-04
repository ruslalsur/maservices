import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Grid,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Hidden,
  Tooltip,
} from '@material-ui/core'
import PanToolIcon from '@material-ui/icons/PanTool'

const useStyles = makeStyles((theme) => ({
  copyBox: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  copyBoxText: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '3px',
    fontSize: '0.8rem',
    fontWeight: 700,
    letterSpacing: 1.1,
    backgroundColor: 'rgba(10, 30, 30, 0.7)',
    color: '#0e9b',
    border: '2px solid #0f85',
    borderRadius: 5,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 5,
    userSelect: 'none',
    animation: '$blink 1.5s alternate infinite',
  },
  '@keyframes blink': {
    from: { border: '2px solid #0f81' },
    to: { border: '2px dashe #0f85' },
  },
  tooltip: {
    fontSize: '0.89rem',
    backgroundColor: 'rgba(20, 30, 30, 0.5)',
    color: '#ff0a',
    boxShadow: '0 0 2px #ff0',
  },
  tableContainerRoot: {
    backgroundColor: 'rgba(200, 220, 230, 0.75)',
  },
  tableCell: {
    border: 'none',
  },
  table: {
    minWidth: '100%',
  },
}))

export const Quotes = () => {
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: 'rgba(20, 40, 50, 0.6)',
      color: theme.palette.common.white,
      fontWeight: 600,
      border: 'none',
      userSelect: 'none',
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell)

  const classes = useStyles()
  const [fileNames, setFileNames] = useState([])
  const [result, setResult] = useState([])
  const [copied, setCopied] = useState(false)

  const tranform = (data) => {
    return data.map((item) => {
      const cleanLine = item
        .replace(/(A|А[0-9]+-)/g, '')
        .replace(/([.xls|.xlsx]+$)/g, '')
      const cleanLineArr = cleanLine.split(' ')
      return [cleanLineArr.shift(), cleanLineArr.join(' ')]
    })
  }

  const copyToClipBoard = (data) => {
    const clipRow = data.map((item) => `${item[0]}\t${item[1]}`)
    const clipText = clipRow.join('\n')
    navigator.clipboard
      .writeText(clipText)
      .then(() => setCopied(true))
      .catch(() => setCopied(false))
  }

  useEffect(() => {
    setResult((prev) => tranform(fileNames))
  }, [fileNames])

  useEffect(() => {
    if (result.length) if (window.navigator) copyToClipBoard(result)
  }, [result])

  const handleFileInputChange = (e) => {
    setFileNames((prev) => Array.from(e.target.files).map((item) => item.name))
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box mt={1}>
                <Tooltip
                  classes={{
                    tooltip: classes.tooltip,
                  }}
                  title='Выбор имен файлов'
                  placement='top'
                >
                  <Button
                    startIcon={<PanToolIcon />}
                    variant='contained'
                    color='secondary'
                    size='small'
                  >
                    <label htmlFor='filenames' style={{ cursor: 'pointer' }}>
                      Выбрать
                    </label>
                    <input
                      hidden
                      type='file'
                      id='filenames'
                      name='filenames'
                      multiple
                      onChange={handleFileInputChange}
                      accept='.xls, .xlsx'
                    />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            {copied && (
              <Grid item xs={6}>
                <Box mt={1} className={classes.copyBox}>
                  <Tooltip
                    classes={{
                      tooltip: classes.tooltip,
                    }}
                    title='Результат уже скопирован'
                    placement='top'
                  >
                    <div className={classes.copyBoxText}>скопировано</div>
                  </Tooltip>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>

        {!fileNames.length ? null : (
          <Hidden smDown>
            <Grid item xs={6}>
              <Grid container direction='column'>
                <Grid item>
                  <Box>
                    <TableContainer
                      component={Paper}
                      classes={{ root: classes.tableContainerRoot }}
                    >
                      <Table
                        className={classes.table}
                        size='small'
                        aria-label='a dense table'
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              Выбранные имена файлов
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {fileNames.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell
                                component='th'
                                scope='row'
                                classes={{ root: classes.tableCell }}
                              >
                                {item}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
        )}
        {!result.length ? null : (
          <Grid item xs={12} md={6}>
            <Grid container direction='column'>
              <Grid item>
                <Box>
                  <TableContainer
                    component={Paper}
                    classes={{ root: classes.tableContainerRoot }}
                  >
                    <Table
                      className={classes.table}
                      size='small'
                      aria-label='a dense table'
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell
                            padding='none'
                            variant='head'
                            align='center'
                          >
                            Квоты
                          </StyledTableCell>
                          <StyledTableCell variant='head'>
                            Адреса
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {result.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell
                              align='center'
                              component='th'
                              scope='row'
                              classes={{ root: classes.tableCell }}
                              padding='none'
                            >
                              {item[0]}
                            </TableCell>
                            <TableCell
                              component='th'
                              scope='row'
                              classes={{ root: classes.tableCell }}
                            >
                              {item[1]}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  )
}
