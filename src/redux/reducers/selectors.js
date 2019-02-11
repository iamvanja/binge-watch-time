import bindSelectors from './utils/bindSelectors'
import * as authSelectors from './authReducer'
import * as discoverSelectors from './discoverReducer'
import * as episodesSelectors from './episodesReducer'
import * as showsListsSelectors from './shows/listsReducer'
import * as seasonsSelectors from './seasonsReducer'
import * as showsSelectors from './showsReducer'
import * as starredShowsSelectors from './starredShowsReducer'
import * as uiSelectors from './uiReducer'
import * as watchedEpisodesSelectors from './watchedEpisodesReducer'
import {
  AUTH,
  DISCOVER,
  EPISODES,
  SHOW_LISTS,
  SEASONS,
  SHOWS,
  STARRED_SHOWS,
  UI,
  WATCHED_EPISODES
} from './index'
import find from 'lodash/find'

export const auth = bindSelectors(
  state => state[AUTH],
  authSelectors
)
export const discover = bindSelectors(
  state => state[DISCOVER],
  discoverSelectors
)
export const episodes = bindSelectors(
  state => state[EPISODES],
  episodesSelectors
)
export const showsLists = bindSelectors(
  state => state[SHOW_LISTS],
  showsListsSelectors
)
export const seasons = bindSelectors(
  state => state[SEASONS],
  seasonsSelectors
)
export const shows = bindSelectors(
  state => state[SHOWS],
  showsSelectors
)
export const starredShows = bindSelectors(
  state => state[STARRED_SHOWS],
  starredShowsSelectors
)
export const ui = bindSelectors(
  state => state[UI],
  uiSelectors
)
export const watchedEpisodes = bindSelectors(
  state => state[WATCHED_EPISODES],
  watchedEpisodesSelectors
)

// combined selectors
export const getDiscoverShows = (state, type) =>
  shows.getShows(state, discover.getDiscoverIds(state, type))

export const getStarredShows = state =>
  shows.getShows(state, starredShows.getStarredIds(state))

export const getShowSeasons = (state, showId) =>
  seasons.getSeasons(state, shows.getShowSeasonIds(state, showId))

export const getShowSeason = (state, seasonId) => {
  const season = seasons.getSeason(state, seasonId)

  return {
    ...season,
    episodes: episodes.getEpisodes(state, season.episodes)
  }
}

export const getSeasonByShowSeasonNumber = (state, showId, seasonNumber) =>
  find(getShowSeasons(state, showId), { seasonNumber }) || {}

export const getNextEpisode = (state, showId) => {
  // get episodes by showId
  const watchedEpisodeIds = watchedEpisodes
    .getWatchedEpisodesByShowId(state, showId)
  const currentWatchedEpisodes = episodes
    .getEpisodes(state, watchedEpisodeIds) || []

  const lastEpisode = currentWatchedEpisodes.reduce((prev, current) => {
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
