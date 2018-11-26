import xhr from 'utils/xhr'

const API_BASE = '/api/auth'

export const verify = values =>
  xhr.post(`${API_BASE}/verify`, values)
