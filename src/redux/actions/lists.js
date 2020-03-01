import { createAction } from 'redux-act'
import { API_ACTION_PREFIX } from 'constants/app'

export const fetch = createAction(
  `${API_ACTION_PREFIX}_LISTS`,
  entityName => ({
    url: `/api/${entityName}/lists`,
    onSuccess: ({ dispatch, getState, response }) => {
      const data = response.reduce((total, current) => ({
        ...total,
        [current.listId]: current.name
      }), {})

      dispatch(setLists(data, entityName))
    }
  }))

export const setLists = createAction(
  'SET_LIST',
  (data, entityName) => ({ data, entityName })
)
