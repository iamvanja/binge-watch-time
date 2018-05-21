import { createReducer } from 'redux-act'
import merge from 'lodash/merge'
import { setSeasons } from 'actions/seasons'

export const initialState = {}

export default createReducer({
  [setSeasons]: (seasons, payload) =>
    merge(seasons, payload)

}, initialState)

// Selectors
export const getSeasons = (seasons, ids = []) =>
  ids.map(id => seasons[id])
