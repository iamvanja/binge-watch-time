// Load environment variables from .env file. Surpress warnings using silent
// if this file is missing.
// This needs to be executed early so that the rest of the codebase has access
// to ENV vars.
import {} from 'dotenv/config'

const {
  NODE_ENV,
  SERVER_PORT: serverPort,
  SERVER_HOST: serverHost,

  LATENCY: latency,
  PUBLIC_PORT: publicPort,
  PUBLIC_HOST: publicHost,
  PUBLIC_SCHEME: publicScheme,
  LOGGING_GLOBAL_LEVEL,
  LOGGING_CONSOLE_ENABLED: loggingConsoleEnabled,
  LOGGING_CONSOLE_LEVEL,
  LOGGING_FILE_ENABLED: loggingFileEnabled,
  LOGGING_FILE_FILENAME: loggingFileFilename,
  LOGGING_FILE_LEVEL,
  JWT_TIMEOUT: jwtTimeout,
  JWT_SECRET: jwtSecret,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_DB,
  MAILER_FROM_EMAIL,
  MAILER_FROM_NAME,
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  MOVIE_DB_API_KEY
} = process.env

const isTrue = (val = '') => val.toLowerCase() === 'true'
const getPublicHost = () => {
  const port = PUBLIC_PORT === 80 || PUBLIC_PORT === 443
    ? ''
    : ':' + PUBLIC_PORT

  return `${PUBLIC_SCHEME}://${PUBLIC_HOST}${port}`
}

// Place variables that the app needs to know about.
// This pattern also prevents a bad practice of (over)writing ENV variables.
export { NODE_ENV }
export const SERVER_PORT = parseInt(serverPort, 10) || 3001
export const SERVER_HOST = serverHost || '127.0.0.1'
export const LATENCY =
  (NODE_ENV === 'development' && Number.isInteger(+latency))
    ? parseInt(latency, 10)
    : 0
export const PUBLIC_PORT = parseInt(publicPort, 10) || 3000
export const PUBLIC_HOST = publicHost || 'localhost'
export const PUBLIC_SCHEME = publicScheme || 'http'

export const BASE_URL = getPublicHost()
export { LOGGING_GLOBAL_LEVEL }
export const LOGGING_CONSOLE_ENABLED = isTrue(loggingConsoleEnabled)
export { LOGGING_CONSOLE_LEVEL }
export const LOGGING_FILE_ENABLED = isTrue(loggingFileEnabled)
export const LOGGING_FILE_FILENAME = loggingFileFilename || 'logs/request.log'
export { LOGGING_FILE_LEVEL }
export const JWT_TIMEOUT = jwtTimeout || 1000 * 60 * 60 // 1 Hour
export const JWT_SECRET = jwtSecret || 'bMiJiiVbYQnQ;PyDUCiXzkij}f&b42iRZ6X'
export { MYSQL_HOST }
export { MYSQL_USER }
export { MYSQL_PASS }
export { MYSQL_DB }
export { MAILER_FROM_EMAIL }
export { MAILER_FROM_NAME }
export { MAILGUN_API_KEY }
export { MAILGUN_DOMAIN }
export { MOVIE_DB_API_KEY }
