import { createReducer } from 'redux-act'
import { set, remove } from 'redux/actions/starredMovies'
import union from 'lodash/union'
import flatMap from 'lodash/flatMap'
import findKey from 'lodash/findKey'
import difference from 'lodash/difference'

export const initialState = {}

export default createReducer({
  [set]: (state, payload) => {
    const newState = { ...state }
    const { listId, ids } = payload

    // first remove movieId if already in any list
    Object.keys(newState).forEach(listId => {
      newState[listId] = difference(newState[listId], ids)
    })

    // add new ids to the specified list
    newState[listId] = union(newState[listId], ids)

    return newState
  },

  [remove]: (state, payload) => {
    const newState = { ...state }
    const { listId, ids } = payload

    newState[listId] = newState[listId].filter(id => !ids.includes(id))

    return newState
  }

}, initialState)

// Selectors
export const getStarredIds = state => state
export const getStarredIdsByListId = (state, listId) => state[listId] || []
export const getStarredIdsFlat = state => flatMap(state)
export const getListIdByMovieId = (state, movieId) => {
  const key = findKey(state, list => list.includes(movieId))

  return key && parseInt(key, 10)
}
export const isMovieStarred = (state, movieId) =>
  getStarredIdsFlat(state).includes(movieId)
