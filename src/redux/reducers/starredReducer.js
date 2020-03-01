import { createReducer } from 'redux-act'
import { set, remove } from 'redux/actions/starred'
import union from 'lodash/union'
import flatMap from 'lodash/flatMap'
import findKey from 'lodash/findKey'
import difference from 'lodash/difference'

export const initialState = {
  shows: {},
  movies: {}
}

export default createReducer({
  [set]: (state, payload) => {
    const newState = { ...state }
    const { listId, ids, entityName } = payload

    // first remove id if already in any list
    Object.keys(newState[entityName]).forEach(listId => {
      newState[entityName][listId] = difference(
        newState[entityName][listId],
        ids
      )
    })

    // add new ids to the specified list
    newState[entityName][listId] = union(newState[entityName][listId], ids)

    return newState
  },

  [remove]: (state, payload) => {
    const newState = { ...state }
    const { listId, ids, entityName } = payload

    newState[entityName][listId] = newState[entityName][listId]
      .filter(id => !ids.includes(id))

    return newState
  }

}, initialState)

// Selectors
export const getStarredIds = (state, entityName) => state[entityName] || {}
export const getStarredIdsByListId = (state, listId, entityName) =>
  state[entityName][listId] || []
export const getStarredIdsFlat = (state, entityName) =>
  flatMap(state[entityName])
export const getListIdById = (state, id, entityName) => {
  const key = findKey(state[entityName], list => list.includes(id))

  return key && parseInt(key, 10)
}
export const isStarred = (state, id, entityName) =>
  getStarredIdsFlat(state, entityName).includes(id)
