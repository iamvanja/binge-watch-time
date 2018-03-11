import { createAction } from 'redux-act'

export const pending = createAction('USER_PENDING')
export const authorized = createAction('USER_AUTHORIZED')
export const unauthorized = createAction('USER_UNAUTHORIZED')
