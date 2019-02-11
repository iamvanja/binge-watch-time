import { createReducer } from 'redux-act'
import { setLists } from 'redux/actions/shows/lists'

export const initialState = {}

export default createReducer({

  [setLists]: (state, payload) => ({
    ...state,
    ...payload
  })

}, initialState)

//  Selectors
export const getLists = (lists) => lists