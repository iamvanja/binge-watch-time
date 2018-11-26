import xhr from 'utils/xhr'
import { API_ACTION_PREFIX } from 'constants/app'
import { apiStart, apiFinish, apiError } from 'actions/ui'
import { isRequestPending } from 'reducers'

export const getRequestLabel = action => {
  return `${action.type}-${action.payload.url}`
}

const apiMiddleware = ({ dispatch, getState }) => next => action => {
  next(action)

  if (!action.type.startsWith(API_ACTION_PREFIX)) {
    return
  }

  const {
    url,
    data,
    method = 'GET',
    onStart = () => { },
    onSuccess = () => { },
    onFailure = () => { },
    hasLocalData = () => false,
    throwError
  } = action.payload
  const dataProperty = ['GET', 'DELETE'].includes(method)
    ? 'params'
    : 'data'
  const label = getRequestLabel(action)

  if (isRequestPending(getState(), action)) {
    return
  }

  if (hasLocalData({ getState })) {
    return
  }

  onStart({ dispatch, getState })
  dispatch(apiStart(label))

  return xhr.request({ url, method, [dataProperty]: data })
    .then(response => {
      onSuccess({ dispatch, getState, response })
      setTimeout(() => dispatch(apiFinish(label)), 0)

      return response
    })
    .catch(error => {
      onFailure({ dispatch, getState, error })
      dispatch(apiError(label))

      // when consumer also wants to catch errors
      if (throwError) {
        throw error
      }
    })
}

export default apiMiddleware
