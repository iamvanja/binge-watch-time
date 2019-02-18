import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import BrowserRouter from './BrowserRouter'
import './scss/app.css'
import store from 'redux/store'
import * as GA from 'utils/googleAnalytics'

import UnauthorizedLayout from 'layouts/UnauthorizedLayout'
import PublicLayout from 'layouts/PublicLayout'
import ErrorLayout from 'layouts/ErrorLayout'
import AuthorizedLayout from 'layouts/AuthorizedLayout'
import AuthorizedRoute from 'components/routes/AuthorizedRoute'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/auth' component={UnauthorizedLayout} />
            <Route path='/(privacy|terms)' component={PublicLayout} />
            <Route path='/error' component={ErrorLayout} />
            <AuthorizedRoute path='/' component={AuthorizedLayout} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

GA.init()
ReactDOM.render(<App />, document.getElementById('root'))
