import { compose, applyMiddleware } from 'redux'
import apiMiddleware from './apiMiddleware'
import authFlowMiddleware from './authFlowMiddleware'

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(
    authFlowMiddleware,
    apiMiddleware
  )
)

export default enhancer
