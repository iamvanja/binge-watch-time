import { createAction } from 'redux-act'
import { API_ACTION_PREFIX } from 'constants/app'
import { normalize } from 'normalizr'
import { setMovies } from './movies'
import { moviesSchema } from 'schemas'
import * as selectors from 'redux/reducers/selectors'

const API_BASE = '/api/movies'

export const fetch = createAction(`${API_ACTION_PREFIX}_MOVIE_STARRED`, () => ({
  url: `${API_BASE}/starred`,
  onSuccess: ({ dispatch, getState, response }) => {
    Object.keys(response).forEach(listId =>
      dispatch(set(listId, response[listId]))
    )
  }
}))

export const fetchByListId = createAction(
  `${API_ACTION_PREFIX}_MOVIES_STARRED_LIST`, listId => {
    return {
      url: `${API_BASE}/starred/list/${listId}`,
      hasLocalData: ({ getState }) => {
        const starredMovieIds = selectors.starredMovies.getStarredIdsByListId(
          getState(), listId
        )
        const movies = selectors.getStarredMoviesByListId(
          getState(), listId
        )

        return starredMovieIds.length
          ? starredMovieIds.length === movies.length
          : false
      },
      onSuccess: ({ dispatch, getState, response }) => {
        const data = normalize(response, moviesSchema)

        dispatch(setMovies(data.entities.movies))
        dispatch(set(listId, data.result))
      }
    }
  })

export const set = createAction(
  'SET_STARRED_MOVIES',
  (listId, ids) => ({ listId, ids })
)

export const remove = createAction(
  'REMOVE_STARRED_MOVIES',
  (listId, ids) => ({ listId, ids })
)

export const star = createAction(
  `${API_ACTION_PREFIX}_MOVIE_STAR`, (movieId, listId) => ({
    url: `${API_BASE}/${movieId}/star`,
    method: 'PUT',
    data: { listId },
    onSuccess: ({ dispatch, getState, response }) => {
      dispatch(set(listId, [movieId]))
    }
  })
)

export const unstar = createAction(
  `${API_ACTION_PREFIX}_MOVIE_UNSTAR`, (movieId, listId) => ({
    url: `${API_BASE}/${movieId}/star`,
    method: 'DELETE',
    onSuccess: ({ dispatch, getState, response }) => {
      dispatch(remove(listId, [movieId]))
    }
  }))
