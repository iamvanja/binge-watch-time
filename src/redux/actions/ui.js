import { createAction } from 'redux-act'

const payloadReducer = label => ({ label })

export const apiStart = createAction('API_START', payloadReducer)
export const apiFinish = createAction('API_FINISH', payloadReducer)
export const apiError = createAction('API_ERROR', payloadReducer)
export const setDiscoverGenre = createAction(
  'SET_DISCOVER_GENRE',
  genreId => ({ discoverGenre: genreId })
)
export const setDiscoverType = createAction(
  'SET_DISCOVER_TYPE',
  type => ({ discoverType: type })
)
export const setCurrentList = createAction(
  'SET_STARRED_LIST',
  (listId, entity) => ({ listId, entity })
)
export const setCurrentSort = createAction(
  'SET_ORDER_LIST',
  (sort, entity) => ({ sort, entity })
)
export const setMobileMenuOpen = createAction(
  'SET_MOBILE_MENU_OPEN',
  isMobileMenuOpen => ({ isMobileMenuOpen })
)
