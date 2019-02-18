import ReactGA from 'react-ga'

let isInitialized = false

export const isEnabled = () =>
  !!process.env.REACT_APP_GA_TRACKING_ID

export const init = (options = {}) => {
  if (!isEnabled() || isInitialized) {
    return null
  }
  isInitialized = true

  return ReactGA.initialize(
    process.env.REACT_APP_GA_TRACKING_ID, {
      debug: process.env.REACT_APP_GA_DEBUG === 'true',
      ...options
    }
  )
}

export const logPageChange = (options = {}) => {
  const { location } = window
  const page = location.pathname + location.search + location.hash

  ReactGA.set({
    page,
    location: `${location.origin}${page}`,
    ...options
  })
  ReactGA.pageview(page)
}
