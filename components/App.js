import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './authentication/Login'
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <h1>About</h1>
        </Route>
        <Route path="/blog">
          <h1>Blog</h1>
        </Route>
        <Route path="/">
            <Login />
          <h1>Home</h1>
        </Route>
      </Switch>
    </Router>
  )
}