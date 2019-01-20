import { createReducer } from 'redux-act'
import { getRequestLabel } from 'middleware/apiMiddleware'
import {
  apiStart,
  apiFinish,
  apiError,
  setDiscoverGenre,
  setCurrentList
} from 'actions/ui'

export const initialState = {
  pendingRequests: [],
  erroredRequests: [],
  discoverGenre: null,
  currentListId: 2
}

const add = (state, label) =>
  [...state, label]

const remove = (state, label) =>
  state.filter(req => req !== label)

export default createReducer({
  [apiStart]: (state, payload) => ({
    ...state,
    pendingRequests: add(state.pendingRequests, payload.label),
    erroredRequests: remove(state.erroredRequests, payload.label)
  }),

  [apiFinish]: (state, payload) => ({
    ...state,
    pendingRequests: remove(state.pendingRequests, payload.label)
  }),

  [apiError]: (state, payload) => ({
    ...state,
    erroredRequests: add(state.erroredRequests, payload.label),
    pendingRequests: remove(state.pendingRequests, payload.label)
  }),

  [setDiscoverGenre]: (state, payload) => ({
    ...state,
    discoverGenre: payload.discoverGenre
  }),

  [setCurrentList]: (state, payload) => ({
    ...state,
    currentListId: parseInt(payload.listId, 10)
  })

}, initialState)

// Selectors
export const isRequestPending = (state, action) =>
  state.pendingRequests.includes(getRequestLabel(action))

export const isRequestErrored = (state, action) =>
  state.erroredRequests.includes(getRequestLabel(action))

export const getDiscoverGenre = state =>
  state.discoverGenre

export const getCurrentListId = state =>
  state.currentListId
