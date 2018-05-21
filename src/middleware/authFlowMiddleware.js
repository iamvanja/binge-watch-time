import { authSuccess, unauthorized } from 'actions/auth'
import * as starredShows from 'actions/starredShows'
import { history } from 'BrowserRouter'
import queryString from 'query-string'

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
    dispatch(starredShows.fetch())
  }

  // on authorized
  if (type === unauthorized.getType()) {
    redirectToLogin()
  }
}

export default authFlowMiddleware
