import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './containers/Home'
import { Quotes } from './containers/Quotes'
import { Routes } from './containers/Routes'
import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/quotes'>
          <Quotes />
        </Route>
        <Route path='/routes'>
          <Routes />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
