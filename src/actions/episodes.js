import { createAction } from 'redux-act'
import { API_ACTION_PREFIX } from 'constants/app'

import { normalize } from 'normalizr'
import { episodeSchema } from 'schemas'

const API_BASE = '/api/shows'

export const one = createAction(
  `${API_ACTION_PREFIX}_EPISODE_ONE`,
  (showId, seasonNumber, episodeNumber) => {
    return {
      url: `${API_BASE}/${showId}/seasons/${seasonNumber}/episodes/${episodeNumber}`,
      onSuccess: ({ dispatch, getState, response }) => {
        const data = normalize({
          ...response,
          showId
        }, episodeSchema)

        dispatch(setEpisodes(data.entities.episodes))
      }
    }
  }
)

export const setEpisodes = createAction('SET_EPISODES')
