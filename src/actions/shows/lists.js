import { createAction } from 'redux-act'
import { API_ACTION_PREFIX } from 'constants/app'

const API_BASE = '/api/shows/lists'

export const fetch = createAction(`${API_ACTION_PREFIX}_SHOWS_LISTS`, () => {
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

export const setLists = createAction('SET_SHOWS_LIST')
