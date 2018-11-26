import { createReducer } from 'redux-act'
import merge from 'lodash/merge'
import isMatch from 'lodash/isMatch'
import { setEpisodes } from 'actions/episodes'

export const initialState = {}

export default createReducer({
  [setEpisodes]: (episodes, payload) =>
    merge({}, episodes, payload)

}, initialState)

// Selectors
export const getEpisodes = (episodes, ids = []) =>
  ids.map(id => getEpisode(episodes, id))

export const getEpisode = (episodes, id) => episodes[id]

export const getEpisodeByQuery = (episodes, query) => {
  let episode = {}
  Object.keys(episodes).some(showId => {
    const isFound = isMatch(episodes[showId], query)
    if (isFound) {
      episode = episodes[showId]
    }

    return isFound
  })

  return episode
}
