import { createAction } from 'redux-act'
import { API_ACTION_PREFIX } from 'constants/app'
import { normalize } from 'normalizr'
import { setShows } from './shows'
import { setSeasons } from './seasons'
import { setMovies } from './movies'
import { showsSchema, moviesSchema } from 'schemas'
import * as selectors from 'redux/reducers/selectors'

const API_BASE = '/api'
const getApiBase = entityName => `${API_BASE}/${entityName}`
const schemaByEntity = {
  shows: showsSchema,
  movies: moviesSchema
}
const starredMethodByEntity = {
  shows: 'getStarredShowsByListId',
  movies: 'getStarredMoviesByListId'
}

export const fetch = createAction(
  `${API_ACTION_PREFIX}_STARRED`,
  (entityName) => ({
    url: `${getApiBase(entityName)}/starred`,
    onSuccess: ({ dispatch, getState, response }) => {
      Object.keys(response).forEach(listId =>
        dispatch(set(listId, response[listId], entityName))
      )
    }
  }))

export const fetchByListId = createAction(
  `${API_ACTION_PREFIX}_STARRED_LIST`,
  (listId, entityName) => {
    return {
      url: `${getApiBase(entityName)}/starred/list/${listId}`,
      hasLocalData: ({ getState }) => {
        const starredIds = selectors.starred.getStarredIdsByListId(
          getState(), listId, entityName
        )
        const entities = selectors[starredMethodByEntity[entityName]](
          getState(), listId
        )

        return starredIds.length
          ? starredIds.length === entities.length
          : false
      },
      onSuccess: ({ dispatch, getState, response }) => {
        const data = normalize(response, schemaByEntity[entityName])

        if (entityName === 'shows') {
          dispatch(setShows(data.entities.shows))
          dispatch(setSeasons(data.entities.seasons))
        } else if (entityName === 'movies') {
          dispatch(setMovies(data.entities.movies))
        }

        dispatch(set(listId, data.result, entityName))
      }
    }
  })

export const set = createAction(
  'SET_STARRED',
  (listId, ids, entityName) => ({ listId, ids, entityName })
)

export const remove = createAction(
  'REMOVE_STARRED',
  (listId, ids, entityName) => ({ listId, ids, entityName })
)

export const star = createAction(
  `${API_ACTION_PREFIX}_STAR`,
  (id, listId, entityName) => ({
    url: `${getApiBase(entityName)}/${id}/star`,
    method: 'PUT',
    data: { listId },
    onSuccess: ({ dispatch, getState, response }) => {
      dispatch(set(listId, [id], entityName))
    }
  })
)

export const unstar = createAction(
  `${API_ACTION_PREFIX}_UNSTAR`,
  (id, listId, entityName) => ({
    url: `${getApiBase(entityName)}/${id}/star`,
    method: 'DELETE',
    onSuccess: ({ dispatch, getState, response }) => {
      dispatch(remove(listId, [id], entityName))
    }
  })
)
