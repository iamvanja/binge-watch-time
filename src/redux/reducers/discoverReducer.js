import { createReducer } from 'redux-act'
import { setDiscoverShows, setDiscoverMovies } from 'redux/actions/discover'
import get from 'lodash/get'

export const initialState = {
  shows: {},
  movies: {}
}

export default createReducer({
  [setDiscoverShows]: (discover, payload) => ({
    ...discover,
    shows: {
      ...discover.shows,
      [payload.category]: payload.ids
    }
  }),

  [setDiscoverMovies]: (discover, payload) => ({
    ...discover,
    movies: {
      ...discover.movies,
      [payload.category]: payload.ids
    }
  })

}, initialState)

// Selectors
export const getDiscoverIds = (state, type, discoverType) =>
  get(state, `${type}.${discoverType}`, [])
