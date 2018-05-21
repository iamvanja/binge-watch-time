import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// Custom Reducers
import authReducer, * as fromAuth from './authReducer'
import discoverReducer, * as fromDiscover from './discoverReducer'
import seasonsReducer, * as fromSeasons from './seasonsReducer'
import showsReducer, * as fromShows from './showsReducer'
import starredShowsReducer, * as fromStarredShows from './starredShowsReducer'
import uiReducer, * as fromUi from './uiReducer'

const AUTH = 'auth'
const DISCOVER = 'discover'
const ROUTING = 'routing'
const SEASONS = 'seasons'
const SHOWS = 'shows'
const STARRED_SHOWS = 'starredShows'
const UI = 'ui'

// Combine Reducers
const reducers = combineReducers({
  [AUTH]: authReducer,
  [DISCOVER]: discoverReducer,
  [ROUTING]: routerReducer, // requires mount at "routing"
  [SEASONS]: seasonsReducer,
  [SHOWS]: showsReducer,
  [STARRED_SHOWS]: starredShowsReducer,
  [UI]: uiReducer
})

export default reducers

// Selectors
export const isAuthPending = state =>
  fromAuth.isAuthPending(state[AUTH])

export const getAuthErrorMessage = state =>
  fromAuth.getAuthErrorMessage(state[AUTH])

export const isLoggedIn = state =>
  fromAuth.isLoggedIn(state[AUTH])

export const getTimeout = state =>
  fromAuth.getTimeout(state[AUTH])

export const isRequestPending = (state, label) =>
  fromUi.isRequestPending(state[UI], label)

export const isRequestErrored = (state, label) =>
  fromUi.isRequestErrored(state[UI], label)

export const getDiscoverGenre = state =>
  fromUi.getDiscoverGenre(state[UI])

export const getSeasons = (state, ids) =>
  fromSeasons.getSeasons(state[SEASONS], ids)

export const getShows = (state, ids) =>
  fromShows.getShows(state[SHOWS], ids)

export const getShow = (state, id) =>
  fromShows.getShow(state[SHOWS], id)

export const getShowSeasonIds = (state, showId) =>
  fromShows.getShowSeasonIds(state[SHOWS], showId)

export const getDiscoverIds = (state, type) =>
  fromDiscover.getDiscoverIds(state[DISCOVER], type)

export const getStarredIds = (state) =>
  fromStarredShows.getStarredIds(state[STARRED_SHOWS])

export const isShowStarred = (state, showId) =>
  fromStarredShows.isShowStarred(state[STARRED_SHOWS], showId)

// combined selectors
export const getDiscoverShows = (state, type) =>
  getShows(state, getDiscoverIds(state, type))

export const getStarredShows = state =>
  getShows(state, getStarredIds(state))

export const getShowSeasons = (state, showId) =>
  getSeasons(state, getShowSeasonIds(state, showId))
