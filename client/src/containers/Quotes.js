import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {},
  table: {
    minWidth: 650,
  },
}))

export const Quotes = () => {
  const classes = useStyles()
  const [fileNames, setFileNames] = useState([])

  const handleFileInputChange = (e) => {
    setFileNames(Array.from(e.target.files).map((item) => item.name))
  }

  return (
    <div className={classes.root}>
      <Grid container direction='column'>
        <Grid item>
          <Box>
            <Button>
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
        <Grid item>
          <Box>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size='small'
                aria-label='a dense table'
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Выбранные файлы</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fileNames.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component='th' scope='row'>
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
    </div>
  )
}
