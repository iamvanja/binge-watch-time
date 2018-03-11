import { createReducer } from 'redux-act'
import actions from 'actions'

export const initialState = {
  isPending: true,
  isLogged: false,
  userId: null,
  timeout: null,
  firstName: null,
  lastName: null,
  email: null
}

export default createReducer({
  [actions.loggedUser.authorized]: (state, loggedUser) => ({
    ...state,
    isPending: false,
    isLogged: true,
    userId: loggedUser.userId,
    timeout: loggedUser.timeout,
    firstName: loggedUser.firstName,
    lastName: loggedUser.lastName,
    email: loggedUser.email
  }),

  [actions.loggedUser.unauthorized]: () => ({
    ...initialState,
    isPending: false,
    isLogged: false
  }),

  [actions.loggedUser.pending]: () => ({
    ...initialState,
    isPending: true,
    isLogged: false
  })

}, initialState)
