import { createReducer } from 'redux-act'
import { ACTION_SET_MOVIES } from 'constants/app'
import merge from 'lodash/merge'

export const initialState = {}

export default createReducer({
  [ACTION_SET_MOVIES]: (movies, payload) =>
    merge({}, movies, payload)

}, initialState)

// Selectors
export const getMovies = (movies, ids = []) =>
  ids.map(id => movies[id])

export const getMovie = (movies, id) => movies[id]
