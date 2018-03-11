import winston from 'winston'
import {
  LOGGING_FILE_ENABLED,
  LOGGING_FILE_LEVEL,
  LOGGING_FILE_FILENAME,
  LOGGING_GLOBAL_LEVEL
} from 'config/env'

const getFileTransport = () => {
  if (LOGGING_FILE_ENABLED) {
    const config = {
      filename: LOGGING_FILE_FILENAME,
      handleExceptions: true,
      json: false,
      colorize: false,
      prettyPrint: true,
      prepend: true,
      level: LOGGING_FILE_LEVEL || LOGGING_GLOBAL_LEVEL
    }

    return new (winston.transports.File)(config)
  }

  return null
}

export default getFileTransport
