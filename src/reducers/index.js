import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// Custom Reducers
import loggedUserReducer from './loggedUserReducer'

// Combine Reducers
const reducers = combineReducers({
  routing: routerReducer, // requires mount at "routing"
  loggedUserState: loggedUserReducer
})

export default reducers
