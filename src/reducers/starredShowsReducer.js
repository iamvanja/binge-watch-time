import { createReducer } from 'redux-act'
import { set, remove } from 'actions/starredShows'
import union from 'lodash/union'

export const initialState = []

export default createReducer({
  [set]: (state, payload) =>
    union(state, payload.ids),

  [remove]: (state, payload) =>
    state.filter(id => !payload.ids.includes(id))

}, initialState)

// Selectors
export const getStarredIds = state => state
export const isShowStarred = (state, showId) =>
  state.includes(showId)
