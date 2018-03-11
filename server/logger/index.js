/**
 * Logging levels are:
 * { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
 *
 * The lower the integer value (0, 1, 2...) the higher the log priority.
 * From that level down, message will be displayed.
 *
 * For example, setting a level to be 'info', all messages with 'info', warn'
 * and 'error' levels are going to be displayed and info, verbose,... skipped.
 *
 */

import winston from 'winston'
import getConsoleTransport from './transports/consoleTransport'
import getFileTransport from './transports/fileTransport'
import { LOGGING_GLOBAL_LEVEL } from 'config/env'
import without from 'lodash/without'

const getTransports = () => {
  const transports = without([
    getConsoleTransport(),
    getFileTransport()
  ], null)

  if (!transports.length) {
    // eslint-disable-next-line no-console
    console.warn('No logger transports found!')
  }

  return transports
}

const logger = new winston.Logger({
  level: LOGGING_GLOBAL_LEVEL,
  transports: getTransports()
})

export default logger
