import React, { useState, useEffect, useRef } from 'react'
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
    fontWeight: 600,
    letterSpacing: 1.1,
    backgroundColor: 'rgba(20, 30, 30, 0.6)',
    color: '#0f8a',
    border: '2px solid #0f85',
    borderRadius: 5,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 5,
    userSelect: 'none',
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
    // userSelect: 'none',
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
  const [copyed, setCopied] = useState(false)
  const resultTableRef = useRef(null)
  const range = document.createRange()
  const selection = window.getSelection()

  const tranform = (data) => {
    return data.map((item) => {
      const cleanLine = item
        .replace(/(A|А[0-9]+-)/g, '')
        .replace(/([.xls|.xlsx]+$)/g, '')
      const cleanLineArr = cleanLine.split(' ')
      return [cleanLineArr.shift(), cleanLineArr.join(' ')]
    })
  }

  useEffect(() => {
    setResult((prev) => tranform(fileNames))
  }, [fileNames])

  useEffect(() => {
    if (resultTableRef.current) {
      const el = resultTableRef.current

      range.selectNode(el)
      selection.removeAllRanges()
      selection.addRange(range)
      setCopied(document.execCommand('copy'))
      selection.removeAllRanges()
    }
  }, [result, range, selection])

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
            {copyed && (
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
                      ref={resultTableRef}
                    >
                      {/* <TableHead>
                        <TableRow>
                          <StyledTableCell padding='none' align='center'>
                            <Box ml={1}>Квоты</Box>
                          </StyledTableCell>
                          <StyledTableCell variant='head'>
                            Адреса
                          </StyledTableCell>
                        </TableRow>
                      </TableHead> */}
                      <TableBody>
                        {result.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell
                              padding='none'
                              align='center'
                              component='th'
                              scope='row'
                              classes={{ root: classes.tableCell }}
                            >
                              <Box px={1}>{item[0]}</Box>
                            </TableCell>
                            <TableCell
                              padding='none'
                              component='th'
                              scope='row'
                              classes={{ root: classes.tableCell }}
                            >
                              <Box py={0.7}>{item[1]}</Box>
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
