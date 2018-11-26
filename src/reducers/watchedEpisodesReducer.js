import { createReducer } from 'redux-act'
import { set, remove } from 'actions/watchedEpisodes'
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
    const { showId, episodeId } = payload
    return {
      ...state,
      [showId]: state[showId].filter(id => id !== episodeId)
    }
  }

}, initialState)

// Selectors
export const getWatchedEpisodesByShowId = (state, showId) =>
  (state[showId] || [])

export const isEpisodeWatched = (state, showId, episodeId) =>
  getWatchedEpisodesByShowId(state, showId).includes(episodeId)
