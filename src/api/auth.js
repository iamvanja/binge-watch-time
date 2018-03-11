import xhr from 'utils/xhr'
import store from 'store'
import actions from 'actions'

const API_BASE = '/api/auth'
const handleLoggedUser = loggedUser => {
  store.dispatch(actions.loggedUser.authorized(loggedUser))
  return loggedUser
}

export const login = values => {
  store.dispatch(actions.loggedUser.pending())
  return xhr.post(`${API_BASE}/login`, values)
    .then(handleLoggedUser)
    .catch(err => {
      store.dispatch(actions.loggedUser.unauthorized())
      return Promise.reject(err)
    })
}

export const verify = values =>
  xhr.post(`${API_BASE}/verify`, values)

export const me = () =>
  xhr.get(`${API_BASE}/me`)
    .then(handleLoggedUser)
    .catch(err => {
      store.dispatch(actions.loggedUser.unauthorized())
      return Promise.reject(err)
    })

export const logout = () =>
  xhr.post(`${API_BASE}/logout`)
    .then(() => {
      store.dispatch(actions.loggedUser.unauthorized())
    })
