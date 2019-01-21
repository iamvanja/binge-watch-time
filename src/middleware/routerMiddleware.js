import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'connected-react-router'
import { setMobileMenuOpen } from 'actions/ui'

export const history = createHistory()

export const routingMiddleware = routerMiddleware(history)

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

const middleware = ({ dispatch, getState }) => next => action => {
  next(action)

  if (action.type === LOCATION_CHANGE) {
    dispatch(setMobileMenuOpen(false))
    window.scrollTo(0, 0)
  }
}

export default middleware
