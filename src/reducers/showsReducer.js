import { createReducer } from 'redux-act'
import merge from 'lodash/merge'
import { setShows } from 'actions/shows'

export const initialState = {}

export default createReducer({
  [setShows]: (shows, payload) =>
    merge(shows, payload)

}, initialState)

// todo: https://redux.js.org/recipes/computing-derived-data#creating-a-memoized-selector
// Selectors
export const getShows = (shows, ids = []) =>
  ids.map(id => shows[id])

export const getShow = (shows, id) => shows[id]
export const getShowSeasonIds = (shows, showId) =>
  (shows[showId] || {}).seasons || []
