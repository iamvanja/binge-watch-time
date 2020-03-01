import { createReducer } from 'redux-act'
import { setLists } from 'redux/actions/lists'

export const initialState = {
  shows: {},
  movies: {}
}

export default createReducer({

  [setLists]: (state, payload) => ({
    ...state,
    [payload.entityName]: {
      ...payload[payload.entityName],
      ...payload.data
    }
  })

}, initialState)

// Selectors
export const getLists = (lists, entityName) => lists[entityName]
