import { createAction } from 'redux-act'
import { normalize } from 'normalizr'
import { setShows } from 'actions/shows'
import { setSeasons } from 'actions/seasons'
import { showsSchema } from 'schemas/shows'

const API_BASE = '/api/shows'

export const fetch = createAction('CALL_API_SHOW_STARRED', () => ({
  url: `${API_BASE}/starred`,
  label: `STARRED`,
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

export const star = createAction('CALL_API_SHOW_STAR', showId => ({
  url: `${API_BASE}/${showId}/star`,
  method: 'PUT',
  label: `STAR_${showId}`,
  onSuccess: ({ dispatch, getState, response }) => {
    dispatch(set([showId]))
  }
}))

export const unstar = createAction('CALL_API_SHOW_UNSTAR', showId => ({
  url: `${API_BASE}/${showId}/star`,
  method: 'DELETE',
  label: `UNSTAR_${showId}`,
  onSuccess: ({ dispatch, getState, response }) => {
    dispatch(remove([showId]))
  }
}))
