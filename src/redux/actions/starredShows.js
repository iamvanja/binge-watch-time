import { createAction } from 'redux-act'
import { API_ACTION_PREFIX } from 'constants/app'

const API_BASE = '/api/shows'

export const fetch = createAction(`${API_ACTION_PREFIX}_SHOW_STARRED`, () => ({
  url: `${API_BASE}/starred`,
  onSuccess: ({ dispatch, getState, response }) => {
    Object.keys(response).forEach(listId =>
      dispatch(set(listId, response[listId]))
    )
  }
}))

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
