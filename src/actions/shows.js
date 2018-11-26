import { createAction } from 'redux-act'
import { API_ACTION_PREFIX } from 'constants/app'
import { showSchema } from 'schemas'
import { normalize } from 'normalizr'
import { setSeasons } from 'actions/seasons'
import { getShow } from 'reducers'

const API_BASE = '/api/shows'

export const one = createAction(`${API_ACTION_PREFIX}_SHOW_ONE`, showId => {
  return {
    url: `${API_BASE}/${showId}`,
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
