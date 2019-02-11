import { createReducer } from 'redux-act'
import { ACTION_SET_SHOWS } from 'constants/app'
import merge from 'lodash/merge'

export const initialState = {}

export default createReducer({
  [ACTION_SET_SHOWS]: (shows, payload) =>
    merge({}, shows, payload)

}, initialState)

// todo: https://redux.js.org/recipes/computing-derived-data#creating-a-memoized-selector
// Selectors
export const getShows = (shows, ids = []) =>
  ids.map(id => shows[id])

export const getShow = (shows, id) => shows[id]
export const getShowSeasonIds = (shows, showId) =>
  (shows[showId] || {}).seasons || []
