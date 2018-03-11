import winston from 'winston'
import {
  LOGGING_CONSOLE_ENABLED,
  LOGGING_CONSOLE_LEVEL,
  LOGGING_GLOBAL_LEVEL
} from 'config/env'

const getConsoleTransport = () => {
  if (LOGGING_CONSOLE_ENABLED) {
    const config = {
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: false,
      colorize: true,
      prettyPrint: true,
      level: LOGGING_CONSOLE_LEVEL || LOGGING_GLOBAL_LEVEL
    }

    return new (winston.transports.Console)(config)
  }

  return null
}

export default getConsoleTransport
