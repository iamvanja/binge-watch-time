import xhr from 'utils/xhr'

const API_BASE = '/api/shows'

export const one = (showId, seasonNumber, episodeNumber) =>
  xhr.get(`${API_BASE}/${showId}/seasons/${seasonNumber}/episodes/${episodeNumber}`)

export const get = (showId, seasonNumber) =>
  xhr.get(`${API_BASE}/${showId}/seasons/${seasonNumber}/episodes`)
