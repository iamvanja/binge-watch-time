import { UserNotAuthenticated } from 'utils/throwables'

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next(new UserNotAuthenticated())
  } else {
    next()
  }
}

export default isAuthenticated
