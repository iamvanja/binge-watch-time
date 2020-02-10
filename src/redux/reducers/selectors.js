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
import without from 'lodash/without'

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

export const getStarredShowsByListId = (state, listId) =>
  shows.getShows(state, starredShows.getStarredIdsByListId(state, listId))
    .filter(show => !!show)

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

  const lastEpisode = currentWatchedEpisodes
    .filter(item => !!item)
    .reduce((prev, current) => {
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

export const getNumberOfAiredEpisodesPerShow = (state, showId) => {
  const {
    lastEpisodeToAir,
    seasons: showSeasonIds
  } = shows.getShow(state, showId)

  return showSeasonIds
    .map(seasonId => seasons.getSeason(state, seasonId))
    .reduce((total, currentSeason) =>
      // skip specials
      !currentSeason.seasonNumber ||
        // or if the season is in the future
        currentSeason.seasonNumber > lastEpisodeToAir.seasonNumber
        ? total
        // if the season is current, only count aired episodes
        : currentSeason.seasonNumber === lastEpisodeToAir.seasonNumber
          ? total + lastEpisodeToAir.episodeNumber
          // else return entire season count
          : total + currentSeason.episodeCount
      , 0)
}

export const getMissedCountPerShow = (state, showId) => {
  const allUnwatched = watchedEpisodes.getWatchedEpisodesByShowId(state, showId)
  const numberOfAiredEpisodes = getNumberOfAiredEpisodesPerShow(state, showId)
  const missedCount = numberOfAiredEpisodes - allUnwatched.length

  return missedCount > 0
    ? missedCount
    : 0
}

export const isSeasonWatched = (state, seasonId) => {
  const season = seasons.getSeason(state, seasonId)
  const watchedEpisodeIds = watchedEpisodes.getWatchedEpisodesByShowId(
    state, season.showId
  )

  // Season's episode count is lower than user's watched episode count for
  // the entire show - it is impossible that this season is fully watched.
  if (season.episodeCount > watchedEpisodeIds.length) {
    return false
  }

  // Episode is fully loaded and we have episode IDs.
  // Let's compare season's episode IDs with watchedEpisodeIds
  if (season.episodes.length) {
    const unwatchedEpisodes = without(season.episodes, ...watchedEpisodeIds)

    return unwatchedEpisodes.length === 0
  }

  // At this point we don't know which episodes are in this season.
  // We only have user watched episodes.
  // Let's construct an array of watched episode IDs for this season
  // that would match season.episodeCount.
  const watchedSeasonEpisodeIds = watchedEpisodeIds
    .reduce((total, watchedEpisodeId) => {
      const episode = episodes.getEpisode(state, watchedEpisodeId) || {}

      return episode.seasonNumber === season.seasonNumber
        ? total.concat(watchedEpisodeId)
        : total
    }, [])

  return watchedSeasonEpisodeIds.length === season.episodeCount
}
