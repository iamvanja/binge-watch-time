import axios from 'axios'
import store from 'redux/store'
import { unauthorized } from 'redux/actions/auth'
import { SESSION_TIMEOUT_MESSAGE } from 'constants/app'

const xhr = axios.create()

// Middleware
xhr.interceptors.response.use(response => {
  resetLastCall()
  return response.data
}, error => {
  if (!error.response) {
    return Promise.reject(error)
  }
  const { status } = error.response

  switch (status) {
    case 401:
      store.dispatch(unauthorized({
        message: SESSION_TIMEOUT_MESSAGE
      }))
  }

  return Promise.reject(error.response)
})

// Track Time Elapsed
var lastCall = null

const resetLastCall = () => {
  lastCall = new Date()
}

const getLastCall = () => {
  return Date.now() - lastCall
}

export { getLastCall }
export default xhr
