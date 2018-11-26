import { createAction } from 'redux-act'
import { API_ACTION_PREFIX } from 'constants/app'
import groupBy from 'lodash/groupBy'
import mapValues from 'lodash/mapValues'
import { setEpisodes } from './episodes'

const API_BASE = '/api/shows'

export const fetch = createAction(`${API_ACTION_PREFIX}_EPISODES_WATCHED`, () => ({
  url: `${API_BASE}/episodes/watched`,
  onSuccess: ({ dispatch, getState, response }) => {
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
}))

export const set = createAction('SET_WATCHED_EPISODES')

export const remove = createAction(
  'REMOVE_WATCHED_EPISODES',
  (showId, episodeId) => ({ showId, episodeId })
)

export const watch = createAction(
  `${API_ACTION_PREFIX}_SHOW_EPISODE_WATCH`,
  (showId, episodeId, seasonNumber, episodeNumber) => ({
    url: `${API_BASE}/${showId}/season/${seasonNumber}/episode/${episodeNumber}/watch`,
    method: 'PUT',
    onSuccess: ({ dispatch, getState, response }) => {
      dispatch(set({ [showId]: [episodeId] }))
    }
  })
)

export const unwatch = createAction(
  `${API_ACTION_PREFIX}_SHOW_EPISODE_UNWATCH`,
  (showId, episodeId, seasonNumber, episodeNumber) => ({
    url: `${API_BASE}/${showId}/season/${seasonNumber}/episode/${episodeNumber}/watch`,
    method: 'DELETE',
    onSuccess: ({ dispatch, getState, response }) => {
      dispatch(remove(showId, episodeId))
    }
  })
)
