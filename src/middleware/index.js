import { compose, applyMiddleware } from 'redux'
import apiMiddleware from './apiMiddleware'
import authFlowMiddleware from './authFlowMiddleware'
import routerMiddleware, { routingMiddleware } from './routerMiddleware'

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(
    routingMiddleware,
    routerMiddleware,
    authFlowMiddleware,
    apiMiddleware
  )
)

export default enhancer
