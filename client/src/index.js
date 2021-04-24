import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'

console.log(`PUBLIC_URL: `, process.env.PUBLIC_URL)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
