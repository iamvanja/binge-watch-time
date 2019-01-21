import { createStore } from 'redux'
import { connectRouter } from 'connected-react-router'
import { history } from 'middleware/routerMiddleware'
import reducers from './reducers'
import enhancer from './middleware'

const store = createStore(
  connectRouter(history)(reducers),
  enhancer
)

export default store
