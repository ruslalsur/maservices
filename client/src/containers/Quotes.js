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
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  tableContainerRoot: {
    backgroundColor: 'rgba(69, 80, 85, 0.5)',
  },
  tableCell: {
    color: '#eee',
    border: 'none',
  },
  table: {
    minWidth: '100%',
  },
}))

export const Quotes = () => {
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: 'rgba(20, 40, 50, 0.5)',
      color: theme.palette.common.white,
      fontWeight: 600,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell)

  const classes = useStyles()
  const [fileNames, setFileNames] = useState([])
  const [result, setResult] = useState([])

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

  const handleFileInputChange = (e) => {
    setFileNames((prev) => Array.from(e.target.files).map((item) => item.name))
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box mt={1}>
            <Button variant='contained' color='secondary'>
              <label htmlFor='filenames'>Выбрать имена файлов</label>
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
          </Box>
        </Grid>
        {!fileNames.length ? null : (
          <Hidden smDown>
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
                          <StyledTableCell padding='none' align='center'>
                            <Box ml={1}>Квоты</Box>
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
                              padding='none'
                              align='center'
                              component='th'
                              scope='row'
                              classes={{ root: classes.tableCell }}
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
