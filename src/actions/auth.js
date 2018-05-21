import { createAction } from 'redux-act'

const API_BASE = '/api/auth'

const authHandlers = shouldRedirect => ({
  onStart: ({ dispatch, getState }) => {
    dispatch(pending())
  },
  onSuccess: ({ dispatch, getState, response }) => {
    dispatch(authSuccess(response, shouldRedirect))
  }
})

export const pending = createAction('USER_LOGIN_PENDING')
export const authSuccess = createAction(
  'USER_LOGIN_SUCCESS',
  userInfo => userInfo,
  (userInfo, shouldRedirect) => ({ shouldRedirect })
)
export const authError = createAction('USER_LOGIN_ERROR')
export const unauthorized = createAction('USER_UNAUTHORIZED')

export const login = createAction('CALL_API_USER_LOGIN', credentials => ({
  url: `${API_BASE}/login`,
  method: 'POST',
  data: credentials,
  ...authHandlers(true),
  onFailure: ({ dispatch, getState, error }) => {
    dispatch(authError(error))
  }
})
)

export const me = createAction('CALL_API_USER_ME', () => ({
  url: `${API_BASE}/me`,
  ...authHandlers()
}))

export const logout = createAction('CALL_API_LOGOUT', () => ({
  url: `${API_BASE}/logout`,
  method: 'POST',
  onSuccess: ({ dispatch, getState, response }) => {
    dispatch(unauthorized())
  }
}))

export const verify = createAction('CALL_API_VERIFY', verifyData => ({
  url: `${API_BASE}/verify`,
  method: 'POST',
  data: verifyData,
  throwError: true
}))
