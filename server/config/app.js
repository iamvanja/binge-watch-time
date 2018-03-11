import logger from 'logger'
import init from 'config/express'
import {
  NODE_ENV,
  SERVER_PORT,
  SERVER_HOST,
  LATENCY
} from 'config/env'

const start = () => {
  const app = init()

  const server = app.listen(SERVER_PORT, SERVER_HOST)

  server.on('error', onServerError)
  server.on('listening', onServerListening(server))
}

const onServerError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = `Port ${SERVER_PORT}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.log('error', `${bind} requires elevated privileges`)
      process.exit(1)
      // eslint-disable-next-line no-unreachable
      break
    case 'EADDRINUSE':
      logger.log('error', `${bind} is already in use`)
      process.exit(1)
      // eslint-disable-next-line no-unreachable
      break
    default:
      throw error
  }
}

const onServerListening = (server) => {
  return () => {
    const addr = server.address()
    logger.log('info', `Node version:\t ${process.version}`)
    logger.log('info', `Environment:\t ${NODE_ENV}`)
    logger.log('info', `Host:\t\t ${addr.address}`)
    logger.log('info', `Port:\t\t ${addr.port}`)
    if (LATENCY) {
      logger.log('info', `Latency:\t\t ${LATENCY}ms`)
    }
    logger.log('info', `PID:\t\t ${process.pid}`)
  }
}

export default start
