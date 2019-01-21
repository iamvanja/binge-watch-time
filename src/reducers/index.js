import { combineReducers } from 'redux'
import find from 'lodash/find'

// Custom Reducers
import authReducer, * as fromAuth from './authReducer'
import discoverReducer, * as fromDiscover from './discoverReducer'
import episodesReducer, * as fromEpisodes from './episodesReducer'
import showsListsReducer, * as fromShowsLists from './shows/listsReducer'
import seasonsReducer, * as fromSeasons from './seasonsReducer'
import showsReducer, * as fromShows from './showsReducer'
import starredShowsReducer, * as fromStarredShows from './starredShowsReducer'
import uiReducer, * as fromUi from './uiReducer'
import watchedEpisodesReducer, * as watchedEpisodes from './watchedEpisodesReducer'

const AUTH = 'auth'
const DISCOVER = 'discover'
const EPISODES = 'episodes'
const SHOW_LISTS = 'showLists'
const SEASONS = 'seasons'
const SHOWS = 'shows'
const STARRED_SHOWS = 'starredShows'
const UI = 'ui'
const WATCHED_EPISODES = 'watchedEpisodes'

// Combine Reducers
const reducers = combineReducers({
  [AUTH]: authReducer,
  [DISCOVER]: discoverReducer,
  [EPISODES]: episodesReducer,
  [SHOW_LISTS]: showsListsReducer,
  [SEASONS]: seasonsReducer,
  [SHOWS]: showsReducer,
  [STARRED_SHOWS]: starredShowsReducer,
  [UI]: uiReducer,
  [WATCHED_EPISODES]: watchedEpisodesReducer
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

export const isRequestPending = (state, action) =>
  fromUi.isRequestPending(state[UI], action)

export const isRequestErrored = (state, action) =>
  fromUi.isRequestErrored(state[UI], action)

export const getDiscoverGenre = state =>
  fromUi.getDiscoverGenre(state[UI])

export const getCurrentListId = state =>
  fromUi.getCurrentListId(state[UI])

export const isMobileMenuOpen = state =>
  fromUi.isMobileMenuOpen(state[UI])

export const getSeasons = (state, ids) =>
  fromSeasons.getSeasons(state[SEASONS], ids)

export const getSeason = (state, id) =>
  fromSeasons.getSeason(state[SEASONS], id)

export const getShows = (state, ids) =>
  fromShows.getShows(state[SHOWS], ids)

export const getShow = (state, id) =>
  fromShows.getShow(state[SHOWS], id)

export const getShowSeasonIds = (state, showId) =>
  fromShows.getShowSeasonIds(state[SHOWS], showId)

export const getDiscoverIds = (state, type) =>
  fromDiscover.getDiscoverIds(state[DISCOVER], type)

export const getEpisodes = (state, ids = []) =>
  fromEpisodes.getEpisodes(state[EPISODES], ids)

export const getEpisode = (state, id) =>
  fromEpisodes.getEpisode(state[EPISODES], id)

export const getEpisodeByQuery = (state, query) =>
  fromEpisodes.getEpisodeByQuery(state[EPISODES], query)

export const getShowLists = (state) =>
  fromShowsLists.getLists(state[SHOW_LISTS])

export const getStarredIds = (state) =>
  fromStarredShows.getStarredIds(state[STARRED_SHOWS])

export const getStarredIdsByListId = (state, listId) =>
  fromStarredShows.getStarredIdsByListId(state[STARRED_SHOWS], listId)

export const getListIdByShowId = (state, showId) =>
  fromStarredShows.getListIdByShowId(state[STARRED_SHOWS], showId)

export const getStarredIdsFlat = (state) =>
  fromStarredShows.getStarredIdsFlat(state[STARRED_SHOWS])

export const isShowStarred = (state, showId) =>
  fromStarredShows.isShowStarred(state[STARRED_SHOWS], showId)

export const getWatchedEpisodesByShowId = (state, showId) =>
  watchedEpisodes.getWatchedEpisodesByShowId(state[WATCHED_EPISODES], showId)

export const isEpisodeWatched = (state, showId, episodeId) =>
  watchedEpisodes.isEpisodeWatched(state[WATCHED_EPISODES], showId, episodeId)

// combined selectors
export const getDiscoverShows = (state, type) =>
  getShows(state, getDiscoverIds(state, type))

export const getStarredShows = state =>
  getShows(state, getStarredIds(state))

export const getShowSeasons = (state, showId) =>
  getSeasons(state, getShowSeasonIds(state, showId))

export const getShowSeason = (state, seasonId) => {
  const seasons = getSeason(state, seasonId)

  return {
    ...seasons,
    episodes: getEpisodes(state, seasons.episodes)
  }
}

export const getSeasonByShowSeasonNumber = (state, showId, seasonNumber) =>
  find(getShowSeasons(state, showId), { seasonNumber }) || {}

export const getNextEpisode = (state, showId) => {
  // get episodes by showId
  const watchedEpisodeIds = getWatchedEpisodesByShowId(state, showId)
  const watchedEpisodes = getEpisodes(state, watchedEpisodeIds) || []

  const lastEpisode = watchedEpisodes.reduce((prev, current) => {
    const isPrevSeasonHigher = prev.seasonNumber > current.seasonNumber
    const isPrevEpisodeHigher = (
      prev.seasonNumber === current.seasonNumber &&
      prev.episodeNumber > current.episodeNumber
    )

    return isPrevSeasonHigher || isPrevEpisodeHigher
      ? prev
      : current
  }, {})

  let seasonNumber = lastEpisode.seasonNumber || 1
  let episodeNumber = lastEpisode.episodeNumber || 0
  const currentSeason = getSeasonByShowSeasonNumber(state, showId, seasonNumber)

  if (currentSeason.episodeCount >= episodeNumber + 1) {
    ++episodeNumber
  } else {
    const nextSeason = getSeasonByShowSeasonNumber(
      state, showId, seasonNumber + 1
    )

    if (nextSeason.id) {
      ++seasonNumber
      episodeNumber = 1
    }
  }

  return { seasonNumber, episodeNumber }
}
