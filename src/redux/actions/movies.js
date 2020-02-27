import { createAction } from 'redux-act'
import { API_ACTION_PREFIX, ACTION_SET_MOVIES } from 'constants/app'
import { movieSchema } from 'schemas'
import { normalize } from 'normalizr'
import * as selectors from 'redux/reducers/selectors'

const API_BASE = '/api/movies'

export const one = createAction(`${API_ACTION_PREFIX}_MOVIE_ONE`, movieId => {
  return {
    url: `${API_BASE}/${movieId}`,
    hasLocalData: ({ getState }) => {
      const show = selectors.movies.getMovie(getState(), movieId)

      return show && show.videos
    },
    onSuccess: ({ dispatch, getState, response }) => {
      const data = normalize(response, movieSchema)

      dispatch(setMovies(data.entities.movies))
    }
  }
})

export const setMovies = createAction(ACTION_SET_MOVIES)
