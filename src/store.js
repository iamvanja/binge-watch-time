import { createStore } from 'redux'
import reducers from './reducers'
import enhancer from './middleware'

const store = createStore(reducers, enhancer)

export default store
