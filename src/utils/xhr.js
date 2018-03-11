import axios from 'axios'
import queryString from 'query-string'

const xhr = axios.create()

// Middleware
xhr.interceptors.response.use(response => {
  resetLastCall()
  return response.data
}, error => {
  if (!error.response) {
    return Promise.reject(error)
  }
  const { status, data } = error.response

  switch (status) {
    case 401:
      const { pathname, search } = window.location
      const query = queryString.stringify({ next: pathname + search })
      // Often times the cause of a 401 is a network request that happens after
      // the user's session has expired, if we handle this error by redirecting
      // before allowing the promise deal with the error, JS will get an error.
      // So this timeout does the redirect on the "next tick" after the promise
      // handles it.
      setTimeout(() => {
        window.location.href = `/auth/login?${query}`
      }, 1)
  }

  return Promise.reject(data)
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
