import xhr from 'utils/xhr'

const API_BASE = '/api/shows'

export const one = showId =>
  xhr.get(`${API_BASE}/${showId}`)
