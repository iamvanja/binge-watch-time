import { createAction } from 'redux-act'

const payloadReducer = label => ({ label })

export const apiStart = createAction('API_START', payloadReducer)
export const apiFinish = createAction('API_FINISH', payloadReducer)
export const apiError = createAction('API_ERROR', payloadReducer)
export const setDiscoverGenre = createAction(
  'SET_DISCOVER_GENRE',
  genreId => ({ discoverGenre: genreId })
)
