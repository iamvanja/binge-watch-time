import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './scss/app.css'
import store from './store'

import UnauthorizedLayout from 'layouts/UnauthorizedLayout'
import PublicLayout from 'layouts/PublicLayout'
import ErrorLayout from 'layouts/ErrorLayout'
import AuthorizedLayout from 'layouts/AuthorizedLayout'
import AuthorizedRoute from 'components/routes/AuthorizedRoute'

// Handle routes with trailing slashes
// https://github.com/ReactTraining/react-router/pull/4357
// eslint-disable-next-line react/prop-types
const Router = ({ children }) => (
  <BrowserRouter>
    <Route render={({ history: { location: { pathname, search, hash } } }) => (
      pathname !== '/' && pathname.slice(-1) === '/'
        ? <Redirect to={`${pathname.slice(0, -1)}${search}${hash}`} />
        : children
    )} />
  </BrowserRouter>
)

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/auth' component={UnauthorizedLayout} />
            <Route path='/(privacy|terms)' component={PublicLayout} />
            <Route path='/error' component={ErrorLayout} />
            <AuthorizedRoute path='/' component={AuthorizedLayout} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
