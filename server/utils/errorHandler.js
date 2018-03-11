import logger from 'logger'
import {
  UserError,
  UserNotAuthenticated,
  UserAuthenticationFailed,
  UserNotAllowed
} from './throwables'

const errorHandler = (err, req, res, next) => {
  // Custom User Errors
  if (err instanceof UserError) {
    res.status(400).json({ message: err.message })
  } else if (err instanceof UserNotAuthenticated) {
    res.sendStatus(401)
  } else if (err instanceof UserAuthenticationFailed) {
    res.status(403).send({ message: err.message || 'Invalid Login' })
  } else if (err instanceof UserNotAllowed) {
    res.status(403).json({ message: 'Insufficient Permissions' })

  // Non-user error (500)
  } else {
    logger.log('error', 'Express Error Handler', err.stack)
    res.status(500).json({ message: 'Our server is experiencing errors' })
  }
}

export default errorHandler
