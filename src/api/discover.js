import xhr from 'utils/xhr'

const API_BASE = '/api/discover'

export const showsNew = () =>
  xhr.get(`${API_BASE}/shows/new`)

export const showsPopular = () =>
  xhr.get(`${API_BASE}/shows/popular`)
