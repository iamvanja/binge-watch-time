
import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

// eslint-disable-next-line react/prop-types
export default ({ children }) =>
  <Router history={history}>
    {children}
  </Router>
