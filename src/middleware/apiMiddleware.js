import xhr from 'utils/xhr'
import { apiStart, apiFinish, apiError } from 'actions/ui'
import { isRequestPending } from 'reducers'

const apiMiddleware = ({ dispatch, getState }) => next => action => {
  next(action)

  if (!action.type.startsWith('CALL_API')) {
    return
  }

  const {
    url,
    data,
    method = 'GET',
    label = url,
    onStart = () => { },
    onSuccess = () => { },
    onFailure = () => { },
    hasLocalData = () => false,
    throwError
  } = action.payload
  const dataProperty = ['GET', 'DELETE'].includes(method)
    ? 'params'
    : 'data'

  if (isRequestPending(getState(), label)) {
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
      dispatch(apiFinish(label))

      return response
    })
    .catch(error => {
      dispatch(apiError(label))
      onFailure({ dispatch, getState, error })

      // when consumer also wants to catch errors
      if (throwError) {
        throw error
      }
    })
}

export default apiMiddleware
