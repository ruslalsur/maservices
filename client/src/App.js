import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container, Box } from '@material-ui/core'
import { Home } from './containers/Home'
import { Quotes } from './containers/Quotes'
import { Routes } from './containers/Routes'
import { Settings } from './containers/Settings'
import { MenuAppBar } from './components/MenuAppBar'
import './App.css'

function App() {
  return (
    <Router>
      <MenuAppBar />
      <Container>
        <Box py={2}>
          <Switch>
            <Route path='/quotes'>
              <Quotes />
            </Route>
            <Route path='/routes'>
              <Routes />
            </Route>
            <Route path='/settings'>
              <Settings />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Box>
      </Container>
    </Router>
  )
}

export default App
