import queryString from 'query-string'
import { authSuccess, unauthorized } from 'redux/actions/auth'
import * as starred from 'redux/actions/starred'
import * as watchedEpisodes from 'redux/actions/watchedEpisodes'
import * as lists from 'redux/actions/lists'
import { history } from './routerMiddleware'

const redirectToAuthenticated = () => {
  const next = queryString.parse(history.location.search).next || '/'

  history.push(next)
}

const redirectToLogin = () => {
  const { pathname, search } = history.location
  let query = ''

  if (pathname !== '/auth/logout') {
    query = queryString.stringify({ next: pathname + search })
  }

  history.replace(`/auth/login?${query}`)
}

const authFlowMiddleware = ({ dispatch, getState }) => next => action => {
  next(action)

  const { type, meta } = action

  // on auth success
  if (type === authSuccess.getType()) {
    if (meta.shouldRedirect) {
      redirectToAuthenticated()
    }

    // extra actions after authSuccess go here
    dispatch(lists.fetch('shows'))
    dispatch(lists.fetch('movies'))
    dispatch(starred.fetch('shows'))
    dispatch(starred.fetch('movies'))
    dispatch(watchedEpisodes.fetch())
  }

  // on unauthorized
  if (type === unauthorized.getType()) {
    redirectToLogin()
  }
}

export default authFlowMiddleware
