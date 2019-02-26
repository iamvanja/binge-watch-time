import { createReducer } from 'redux-act'
import { set, remove } from 'redux/actions/watchedEpisodes'
import mergeWith from 'lodash/mergeWith'

export const initialState = {}

export default createReducer({
  [set]: (state, payload) => {
    const nextState = { ...state }

    return mergeWith(nextState, payload, (objValue, srcValue) =>
      (objValue || []).concat(srcValue)
    )
  },

  [remove]: (state, payload) => {
    const { showId, episodeIds = [] } = payload

    return {
      ...state,
      [showId]: state[showId].filter(id => !episodeIds.includes(id))
    }
  }

}, initialState)

// Selectors
export const getWatchedEpisodesByShowId = (state, showId) =>
  (state[showId] || [])

export const isEpisodeWatched = (state, showId, episodeId) =>
  getWatchedEpisodesByShowId(state, showId).includes(episodeId)
