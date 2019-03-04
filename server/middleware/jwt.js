import nJwt from 'njwt'
import Cookies from 'cookies'

// Create a JWT
const createJwt = (payload, secret, timeout) => {
  const jwt = nJwt.create({
    sub: payload
  }, secret)
  const exp = Number.isInteger(timeout)
    ? new Date().getTime() + timeout
    : null
  jwt.setExpiration(exp)
  return jwt.compact()
}

// Set JWT Cookie
const setJwtCookie = (req, res, payload, secret, timeout) => {
  const jwt = createJwt(payload, secret, timeout)
  new Cookies(req, res).set('accessToken', jwt, {
    // Front-end JS can't read token
    httpOnly: true,
    // Ability to replace cookie (logging out)
    overwrite: true,

    maxAge: timeout
  })
}

// Verify JWT
const verifyJwt = (token, secret) => {
  try {
    return nJwt.verify(token, secret)
  } catch (e) {
    return false
  }
}

// Middleware
const jwt = (secret, timeout) =>
  (req, res, next) => {
    const token = new Cookies(req, res).get('accessToken')
    const verified = verifyJwt(token, secret)
    req.user = {} // Default

    // Utility for `req.login` and session renewals to use
    const startSession = (payload, useTimeout) => {
      setJwtCookie(req, res, payload, secret, useTimeout)
    }

    // For each reqeust, if verified: renew session
    if (verified) {
      // If there was no timeout used before, don't use a timeout again
      const useTimeout = verified.body.exp ? timeout : null
      // Renew JWT
      startSession(verified.body.sub, useTimeout)
      // Add user session to `req`
      req.user = verified.body.sub
    }

    // Add utility to `req` argument to determine if the user is authenticated
    req.isAuthenticated = () => !!verified

    // Login
    req.login = (payload, keepAlive = false) => {
      const useTimeout = !keepAlive ? timeout : null
      payload.timeout = useTimeout
      startSession(payload, useTimeout)
      return payload
    }

    // Logout
    req.logout = () => {
      new Cookies(req, res).set('accessToken', null, {
        httpOnly: true,
        maxAge: 0
      })
    }

    next()
  }

export default jwt
