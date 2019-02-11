import xhr from 'utils/xhr'

const API_BASE = '/api/users'

export const register = values =>
  xhr.post(`${API_BASE}/register`, values)

export const passwordResetRequest = values =>
  xhr.post(`${API_BASE}/password-reset/request`, values)

export const passwordReset = values =>
  xhr.post(`${API_BASE}/password-reset`, values)
