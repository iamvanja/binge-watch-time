import xhr from 'utils/xhr'

const API_BASE = '/api/movies'

export const search = name =>
  xhr.get(`${API_BASE}/search/${name}`)
