import { createAction } from 'redux-act'
import { API_ACTION_PREFIX } from 'constants/app'

const API_BASE = '/api/movies/lists'

export const fetch = createAction(`${API_ACTION_PREFIX}_MOVIES_LISTS`, () => {
  return {
    url: API_BASE,
    onSuccess: ({ dispatch, getState, response }) => {
      const data = response.reduce((total, current) => ({
        ...total,
        [current.listId]: current.name
      }), {})

      dispatch(setLists(data))
    }
  }
})

export const setLists = createAction('SET_MOVIES_LIST')
