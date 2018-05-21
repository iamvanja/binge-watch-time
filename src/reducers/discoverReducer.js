import { createReducer } from 'redux-act'
import { setDiscoverShows } from 'actions/discover'

export const initialState = {}

export default createReducer({
  [setDiscoverShows]: (discover, payload) => ({
    ...discover,
    [payload.category]: payload.ids
  })

}, initialState)

// Selectors
export const getDiscoverIds = (discover, type) => discover[type]
