
import React from 'react'
import { renderable } from 'constants/propTypes'
import { ConnectedRouter } from 'connected-react-router'
import { history } from 'redux/middleware/routerMiddleware'

const BrowserRouter = ({ children }) =>
  <ConnectedRouter history={history}>
    {children}
  </ConnectedRouter>

BrowserRouter.propTypes = {
  children: renderable.isRequired
}

export default BrowserRouter
