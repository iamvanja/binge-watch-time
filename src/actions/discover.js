import { createAction } from 'redux-act'
import { normalize } from 'normalizr'
import { setShows } from './shows'
import { showsSchema } from 'schemas/shows'
import { DISCOVER_NEW, DISCOVER_POPULAR } from 'constants/discover'

const API_BASE = '/api/discover'

const getUrl = type => {
  switch (type) {
    case DISCOVER_NEW:
    case DISCOVER_POPULAR:
      return `${API_BASE}/shows/category/${type}`.toLowerCase()
    default:
      return `${API_BASE}/shows/genre/${type}`.toLowerCase()
  }
}

export const fetch = createAction('CALL_API_DISCOVER', type => {
  return {
    url: getUrl(type),
    label: `DISCOVER_${type}`.toUpperCase(),
    onSuccess: ({ dispatch, getState, response = {} }) => {
      const data = normalize(response.results || [], showsSchema)

      dispatch(setShows(data.entities.shows))
      dispatch(setDiscoverShows(type, data.result))
    }
  }
})

export const setDiscoverShows = createAction(
  'SET_DISCOVER_SHOWS',
  (category, ids) => ({ category, ids })
)
