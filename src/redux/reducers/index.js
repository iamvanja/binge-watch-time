import { combineReducers } from 'redux'
import authReducer from './authReducer'
import discoverReducer from './discoverReducer'
import episodesReducer from './episodesReducer'
import listsReducer from './listsReducer'
import moviesReducer from './moviesReducer'
import seasonsReducer from './seasonsReducer'
import showsReducer from './showsReducer'
import starredMoviesReducer from './starredMoviesReducer'
import starredShowsReducer from './starredShowsReducer'
import uiReducer from './uiReducer'
import watchedEpisodesReducer from './watchedEpisodesReducer'

export const AUTH = 'auth'
export const DISCOVER = 'discover'
export const EPISODES = 'episodes'
export const LISTS = 'lists'
export const MOVIES = 'movies'
export const SEASONS = 'seasons'
export const SHOWS = 'shows'
export const STARRED_MOVIES = 'starredMovies'
export const STARRED_SHOWS = 'starredShows'
export const UI = 'ui'
export const WATCHED_EPISODES = 'watchedEpisodes'

const reducers = combineReducers({
  [AUTH]: authReducer,
  [DISCOVER]: discoverReducer,
  [EPISODES]: episodesReducer,
  [LISTS]: listsReducer,
  [MOVIES]: moviesReducer,
  [SEASONS]: seasonsReducer,
  [SHOWS]: showsReducer,
  [STARRED_MOVIES]: starredMoviesReducer,
  [STARRED_SHOWS]: starredShowsReducer,
  [UI]: uiReducer,
  [WATCHED_EPISODES]: watchedEpisodesReducer
})

export default reducers
