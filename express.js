const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())

app.use('/api/', require('./routes/quotesRoutes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.use('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  )
}

const start = async () => {
  try {
    app.listen(process.env.PORT, () =>
      console.log(
        `слушаю на http://127.0.0.1:${process.env.PORT} в режиме ${process.env.NODE_ENV}`
      )
    )
  } catch (err) {
    console.log(err.message || 'ошибка')
    process.exit(1)
  }
}

start()
