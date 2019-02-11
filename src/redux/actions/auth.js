import { createAction } from 'redux-act'
import { API_ACTION_PREFIX } from 'constants/app'

const API_BASE = '/api/auth'

const authHandlers = shouldRedirect => ({
  onStart: ({ dispatch, getState }) => {
    dispatch(pending())
  },
  onSuccess: ({ dispatch, getState, response }) => {
    dispatch(authSuccess(response, shouldRedirect))
  }
})

const dispatchUnauthorized = ({ dispatch }) => {
  dispatch(unauthorized())
}

export const pending = createAction('USER_LOGIN_PENDING')
export const authSuccess = createAction(
  'USER_LOGIN_SUCCESS',
  userInfo => userInfo,
  (userInfo, shouldRedirect) => ({ shouldRedirect })
)
export const authError = createAction('USER_LOGIN_ERROR')
export const unauthorized = createAction('USER_UNAUTHORIZED')

export const login = createAction(`${API_ACTION_PREFIX}_USER_LOGIN`, credentials => ({
  url: `${API_BASE}/login`,
  method: 'POST',
  data: credentials,
  ...authHandlers(true),
  onFailure: ({ dispatch, getState, error }) => {
    dispatch(authError(error.data))
  }
})
)

export const me = createAction(`${API_ACTION_PREFIX}_USER_ME`, () => ({
  url: `${API_BASE}/me`,
  ...authHandlers(),
  onFailure: middlewareBag => {
    // 401 is handled by utils/xhr interceptor,
    // handle everything else here
    if (middlewareBag.error.status !== 401) {
      dispatchUnauthorized(middlewareBag)
    }
  }
}))

export const logout = createAction(`${API_ACTION_PREFIX}_LOGOUT`, () => ({
  url: `${API_BASE}/logout`,
  method: 'POST',
  onSuccess: dispatchUnauthorized
}))
