import xhr from 'utils/xhr'

const API_BASE = '/api/users'

export const register = values =>
  xhr.post(`${API_BASE}/register`, values)
