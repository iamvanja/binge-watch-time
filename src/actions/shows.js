import { createAction } from 'redux-act'
import { showSchema } from 'schemas/shows'
import { normalize } from 'normalizr'
import { setSeasons } from 'actions/seasons'
import { getShow } from 'reducers'

const API_BASE = '/api/shows'

export const one = createAction('CALL_API_SHOW_ONE', showId => {
  return {
    url: `${API_BASE}/${showId}`,
    label: `SHOW_${showId}`,
    hasLocalData: ({ getState }) => {
      const show = getShow(getState(), showId)
      return show && show.networks && show.seasons
    },
    onSuccess: ({ dispatch, getState, response }) => {
      const data = normalize(response, showSchema)

      dispatch(setShows(data.entities.shows))
      dispatch(setSeasons(data.entities.seasons))
    }
  }
})

export const setShows = createAction('SET_SHOWS')
