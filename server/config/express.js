import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import path from 'path'
import jwt from 'middleware/jwt'
import {
  LATENCY,
  JWT_TIMEOUT,
  JWT_SECRET,
  NODE_ENV
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

  if (NODE_ENV === 'production') {
    // Serve the static files from the React app
    app.use(express.static(path.join(__dirname, '../../build')))
    // Handle requests by serving index.html for all routes
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../build', 'index.html'))
    })
  }
}

const init = app => {
  app = app || express()

  initMiddleware(app)

  initHeaders(app)

  initRoutes(app)

  return app
}

export default init
