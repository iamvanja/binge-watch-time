import { createReducer } from 'redux-act'
import merge from 'lodash/merge'
import { setSeasons, setSeasonEpisodes } from 'actions/seasons'

export const initialState = {}

export default createReducer({
  [setSeasons]: (seasons, payload) =>
    merge({}, seasons, payload),

  [setSeasonEpisodes]: (seasons, payload) => {
    const newSeasonEpisodes = {}
    Object.keys(payload).forEach(seasonId => {
      const oldSeasonState = seasons[seasonId]

      newSeasonEpisodes[seasonId] = {
        ...oldSeasonState,
        episodes: [
          ...new Set([
            ...oldSeasonState.episodes,
            ...payload[seasonId].episodes
          ])
        ]
      }
    })

    return {
      ...seasons,
      ...newSeasonEpisodes
    }
  }

}, initialState)

// Selectors
export const getSeasons = (seasons, ids = []) =>
  ids.map(id => getSeason(seasons, id))

export const getSeason = (seasons, id) => seasons[id]
