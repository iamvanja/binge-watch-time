import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import jwt from 'middleware/jwt'
import {
  LATENCY,
  JWT_TIMEOUT,
  JWT_SECRET
} from 'config/env'

const initMiddleware = app => {
  app.enable('trust proxy', true)

  // Latency middleware (for development realism)
  if (LATENCY) {
    app.use((req, res, next) => setTimeout(next, LATENCY))
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  // JSON Web Tokens
  app.use(jwt(JWT_SECRET, JWT_TIMEOUT))
}

const initHeaders = app => {
  app.use(helmet())
}

/**
 * We `require` here to preventing hoisting and ensure all middleware is
 * registered first.
 */
const initRoutes = app => {
  app.use('/api', require('api').default)
}

const init = app => {
  app = app || express()

  initMiddleware(app)

  initHeaders(app)

  initRoutes(app)

  return app
}

export default init
