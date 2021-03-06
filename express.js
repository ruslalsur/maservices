const express = require('express')
const path = require('path')

const port = process.env.PORT || 7002

const app = express()
app.use(express.json())

app.use('/api/quotes', require('./routes/quotesRoutes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.use('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  )
}

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(
        `слушаю на http://localhost:${port} в режиме ${process.env.NODE_ENV}`
      )
    )
  } catch (err) {
    console.log(err.message || 'ошибка')
    process.exit(1)
  }
}

start()
