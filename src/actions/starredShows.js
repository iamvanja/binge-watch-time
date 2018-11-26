import { createAction } from 'redux-act'
import { API_ACTION_PREFIX } from 'constants/app'
import { normalize } from 'normalizr'
import { setShows } from 'actions/shows'
import { setSeasons } from 'actions/seasons'
import { showsSchema } from 'schemas'

const API_BASE = '/api/shows'

export const fetch = createAction(`${API_ACTION_PREFIX}_SHOW_STARRED`, () => ({
  url: `${API_BASE}/starred`,
  onSuccess: ({ dispatch, getState, response }) => {
    const data = normalize(response, showsSchema)

    dispatch(setShows(data.entities.shows))
    dispatch(setSeasons(data.entities.seasons))
    dispatch(set(data.result))
  }
}))

export const set = createAction(
  'SET_STARRED_SHOWS',
  ids => ({ ids })
)

export const remove = createAction(
  'REMOVE_STARRED_SHOWS',
  ids => ({ ids })
)

export const star = createAction(`${API_ACTION_PREFIX}_SHOW_STAR`, showId => ({
  url: `${API_BASE}/${showId}/star`,
  method: 'PUT',
  onSuccess: ({ dispatch, getState, response }) => {
    dispatch(set([showId]))
  }
}))

export const unstar = createAction(`${API_ACTION_PREFIX}_SHOW_UNSTAR`, showId => ({
  url: `${API_BASE}/${showId}/star`,
  method: 'DELETE',
  onSuccess: ({ dispatch, getState, response }) => {
    dispatch(remove([showId]))
  }
}))
