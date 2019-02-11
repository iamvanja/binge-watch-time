import { createAction } from 'redux-act'
import { API_ACTION_PREFIX } from 'constants/app'
import { normalize } from 'normalizr'
import { seasonSchema } from 'schemas'
import { setEpisodes } from 'redux/actions/episodes'

const API_BASE = '/api/shows'

export const setSeasons = createAction('SET_SEASONS')
export const setSeasonEpisodes = createAction('SET_SEASON_EPISODES')

export const seasonEpisodes = createAction(
  `${API_ACTION_PREFIX}_SEASON_ONE`,
  (showId, seasonNumber) => {
    return {
      url: `${API_BASE}/${showId}/seasons/${seasonNumber}`,
      onSuccess: ({ dispatch, getState, response }) => {
        const data = normalize({
          ...response,
          showId
        }, seasonSchema)

        dispatch(setSeasonEpisodes(data.entities.seasons))
        dispatch(setEpisodes(data.entities.episodes))
      }
    }
  }
)
