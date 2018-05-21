import { createAction } from 'redux-act'

const API_BASE = '/api/users'

export const register = createAction('CALL_API_REGISTER', registerData => ({
  url: `${API_BASE}/register`,
  method: 'POST',
  data: registerData,
  throwError: true
}))
