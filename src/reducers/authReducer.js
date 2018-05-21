import { createReducer } from 'redux-act'
import {
  pending,
  authSuccess,
  authError,
  unauthorized
} from 'actions/auth'

export const initialState = {
  isPending: null,
  userId: null,
  timeout: null,
  firstName: null,
  lastName: null,
  email: null,
  errorMessage: null
}

export default createReducer({
  [pending]: state => ({
    ...state,
    isPending: true,
    errorMessage: null
  }),

  [authSuccess]: (state, payload) => ({
    ...state,
    isPending: false,
    userId: payload.userId,
    timeout: payload.timeout,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    errorMessage: null
  }),

  [authError]: (state, payload = {}) => ({
    ...state,
    isPending: false,
    errorMessage: payload.message || 'Login Error'
  }),

  [unauthorized]: (state, payload = {}) => ({
    ...state,
    isPending: false,
    errorMessage: payload.message
  })

}, initialState)

// Selectors
export const isAuthPending = state => state.isPending
export const isLoggedIn = ({ userId }) => userId === null ? userId : !!userId
export const getAuthErrorMessage = state => state.errorMessage
export const getTimeout = state => state.timeout
