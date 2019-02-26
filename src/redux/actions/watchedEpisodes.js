import { createAction } from 'redux-act'
import { API_ACTION_PREFIX } from 'constants/app'
import groupBy from 'lodash/groupBy'
import mapValues from 'lodash/mapValues'
import { setEpisodes } from './episodes'

const API_BASE = '/api/shows'

const handleWatchedEpisodes = ({ dispatch, getState, response }) => {
  const data = mapValues(
    groupBy(response, value => value.showId),
    shows => shows.map(({ episodeId }) => episodeId)
  )

  const episodesData = response.reduce((acc, current) => ({
    ...acc,
    [current.episodeId]: current
  }), {})

  dispatch(set(data))
  dispatch(setEpisodes(episodesData))
}

export const fetch = createAction(`${API_ACTION_PREFIX}_EPISODES_WATCHED`, () => ({
  url: `${API_BASE}/episodes/watched`,
  onSuccess: handleWatchedEpisodes
}))

export const set = createAction('SET_WATCHED_EPISODES')

export const remove = createAction(
  'REMOVE_WATCHED_EPISODES',
  (showId, episodeIds) => ({ showId, episodeIds })
)

export const watch = createAction(
  `${API_ACTION_PREFIX}_SHOW_EPISODE_WATCH`,
  (showId, episodeId, seasonNumber, episodeNumber) => ({
    url: `${API_BASE}/${showId}/seasons/${seasonNumber}/episode/${episodeNumber}/watch`,
    method: 'PUT',
    onSuccess: ({ dispatch, getState, response }) => {
      dispatch(set({ [showId]: [episodeId] }))
    }
  })
)

export const unwatch = createAction(
  `${API_ACTION_PREFIX}_SHOW_EPISODE_UNWATCH`,
  (showId, episodeId, seasonNumber, episodeNumber) => ({
    url: `${API_BASE}/${showId}/seasons/${seasonNumber}/episode/${episodeNumber}/watch`,
    method: 'DELETE',
    onSuccess: ({ dispatch, getState, response }) => {
      dispatch(remove(showId, [episodeId]))
    }
  })
)

export const watchSeason = createAction(
  `${API_ACTION_PREFIX}_SHOW_SEASON_EPISODES_WATCH`,
  (showId, seasonNumber) => ({
    url: `${API_BASE}/${showId}/seasons/${seasonNumber}/watch`,
    method: 'PUT',
    onSuccess: handleWatchedEpisodes
  })
)

export const unwatchSeason = createAction(
  `${API_ACTION_PREFIX}_SHOW_SEASON_EPISODES_UNWATCH`,
  (showId, seasonNumber) => ({
    url: `${API_BASE}/${showId}/seasons/${seasonNumber}/watch`,
    method: 'DELETE',
    onSuccess: ({ dispatch, getState, response = [] }) => {
      const { showId } = response[0]
      const ids = response.map(({ episodeId }) => episodeId)

      dispatch(remove(showId, ids))
    }
  })
)
