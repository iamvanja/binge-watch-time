import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'connected-react-router'
import { setMobileMenuOpen } from 'redux/actions/ui'
import * as GA from 'utils/googleAnalytics'

export const history = createHistory()

export const routingMiddleware = routerMiddleware(history)

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

const middleware = ({ dispatch, getState }) => next => action => {
  next(action)

  if (action.type === LOCATION_CHANGE) {
    GA.logPageChange()
    dispatch(setMobileMenuOpen(false))
    window.scrollTo(0, 0)
  }
}

export default middleware
