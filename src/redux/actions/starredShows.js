import { createAction } from 'redux-act'
import { API_ACTION_PREFIX } from 'constants/app'
import { normalize } from 'normalizr'
import { setShows } from './shows'
import { setSeasons } from './seasons'
import { showsSchema } from 'schemas'
import * as selectors from 'redux/reducers/selectors'

const API_BASE = '/api/shows'

export const fetch = createAction(`${API_ACTION_PREFIX}_SHOW_STARRED`, () => ({
  url: `${API_BASE}/starred`,
  onSuccess: ({ dispatch, getState, response }) => {
    Object.keys(response).forEach(listId =>
      dispatch(set(listId, response[listId]))
    )
  }
}))

export const fetchByListId = createAction(
  `${API_ACTION_PREFIX}_SHOWS_STARRED_LIST`, listId => {
    return {
      url: `${API_BASE}/starred/list/${listId}`,
      hasLocalData: ({ getState }) => {
        const starredShowIds = selectors.starredShows.getStarredIdsByListId(
          getState(), listId
        )
        const shows = selectors.getStarredShowsByListId(
          getState(), listId
        )

        return starredShowIds.length
          ? starredShowIds.length === shows.length
          : false
      },
      onSuccess: ({ dispatch, getState, response }) => {
        const data = normalize(response, showsSchema)

        dispatch(setShows(data.entities.shows))
        dispatch(setSeasons(data.entities.seasons))
        dispatch(set(listId, data.result))
      }
    }
  })

export const set = createAction(
  'SET_STARRED_SHOWS',
  (listId, ids) => ({ listId, ids })
)

export const remove = createAction(
  'REMOVE_STARRED_SHOWS',
  (listId, ids) => ({ listId, ids })
)

export const star = createAction(
  `${API_ACTION_PREFIX}_SHOW_STAR`, (showId, listId) => ({
    url: `${API_BASE}/${showId}/star`,
    method: 'PUT',
    data: { listId },
    onSuccess: ({ dispatch, getState, response }) => {
      dispatch(set(listId, [showId]))
    }
  })
)

export const unstar = createAction(
  `${API_ACTION_PREFIX}_SHOW_UNSTAR`, (showId, listId) => ({
    url: `${API_BASE}/${showId}/star`,
    method: 'DELETE',
    onSuccess: ({ dispatch, getState, response }) => {
      dispatch(remove(listId, [showId]))
    }
  }))
