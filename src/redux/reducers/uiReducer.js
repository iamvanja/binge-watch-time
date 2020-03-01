import { createReducer } from 'redux-act'
import { getRequestLabel } from 'redux/middleware/apiMiddleware'
import {
  apiStart,
  apiFinish,
  apiError,
  setDiscoverGenre,
  setDiscoverType,
  setCurrentList,
  setCurrentSort,
  setMobileMenuOpen
} from 'redux/actions/ui'

export const initialState = {
  pendingRequests: [],
  erroredRequests: [],
  discoverGenre: null,
  currentListId: {
    shows: 2,
    movies: 2
  },
  isMobileMenuOpen: false,
  currentSort: 'nextEpisodeToAir.airDate-asc'
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

  [setDiscoverType]: (state, payload) => ({
    ...state,
    discoverType: payload.discoverType
  }),

  [setCurrentList]: (state, payload) => ({
    ...state,
    currentListId: {
      ...state.currentListId,
      [payload.entity]: parseInt(payload.listId, 10)
    }
  }),

  [setCurrentSort]: (state, payload) => ({
    ...state,
    currentSort: payload.sort
  }),

  [setMobileMenuOpen]: (state, payload) => ({
    ...state,
    isMobileMenuOpen: !!payload.isMobileMenuOpen
  })

}, initialState)

// Selectors
export const isRequestPending = (state, action) =>
  state.pendingRequests.includes(getRequestLabel(action))

export const isRequestErrored = (state, action) =>
  state.erroredRequests.includes(getRequestLabel(action))

export const getDiscoverGenre = state =>
  state.discoverGenre

export const getDiscoverType = state =>
  state.discoverType || 'shows'

export const getCurrentListId = (state, entity) =>
  state.currentListId[entity]

export const getCurrentSort = state =>
  state.currentSort

export const isMobileMenuOpen = state =>
  !!state.isMobileMenuOpen
