import { createAction } from 'redux-act'
import { API_ACTION_PREFIX } from 'constants/app'
import { normalize } from 'normalizr'
import { setShows } from './shows'
import { setMovies } from './movies'
import { showsSchema, moviesSchema } from 'schemas'
import { DISCOVER_NEW, DISCOVER_POPULAR } from 'constants/discover'

const API_BASE = '/api/discover'

const getUrl = (type, contentType) => {
  switch (contentType) {
    case DISCOVER_NEW:
    case DISCOVER_POPULAR:
      return `${API_BASE}/${type}/category/${contentType}`.toLowerCase()
    default:
      return `${API_BASE}/${type}/genre/${contentType}`.toLowerCase()
  }
}

export const fetchShows = createAction(`${API_ACTION_PREFIX}_DISCOVER_SHOWS`, contentType => {
  return {
    url: getUrl('shows', contentType),
    onSuccess: ({ dispatch, getState, response = {} }) => {
      const data = normalize(response.results || [], showsSchema)

      dispatch(setShows(data.entities.shows))
      dispatch(setDiscoverShows(contentType, data.result))
    }
  }
})

export const fetchMovies = createAction(`${API_ACTION_PREFIX}_DISCOVER_MOVIES`, contentType => {
  return {
    url: getUrl('movies', contentType),
    onSuccess: ({ dispatch, getState, response = {} }) => {
      const data = normalize(response.results || [], moviesSchema)

      dispatch(setMovies(data.entities.movies))
      dispatch(setDiscoverMovies(contentType, data.result))
    }
  }
})

export const setDiscoverShows = createAction(
  'SET_DISCOVER_SHOWS',
  (category, ids) => ({ category, ids })
)
export const setDiscoverMovies = createAction(
  'SET_DISCOVER_MOVIES',
  (category, ids) => ({ category, ids })
)
