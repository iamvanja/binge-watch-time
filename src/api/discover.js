import xhr from 'utils/xhr'

const API_BASE = '/api/discover'

export const showsNew = () =>
  xhr.get(`${API_BASE}/shows/category/new`)

export const showsPopular = () =>
  xhr.get(`${API_BASE}/shows/category/popular`)

export const showsByGenreId = genreId =>
  xhr.get(`${API_BASE}/shows/genre/${genreId}`)
