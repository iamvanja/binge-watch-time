import UserShowModel from 'models/UserShowModel'
import ServiceShowModel from 'models/ServiceShowModel'
import { UserNotAllowed } from 'utils/throwables'

export const toggleStar = (req, res, next) => {
  const { userId } = req.user
  const { showId } = req.params
  const modelMethod = req.method === 'PUT'
    ? 'insertIgnore'
    : req.method === 'DELETE'
      ? 'delete'
      : null

  if (!modelMethod) {
    return next(new UserNotAllowed())
  }

  UserShowModel[modelMethod]({ userId, showId })
    .then(() => res.sendStatus(204))
    .catch(next)
}

export const starredShows = (req, res, next) => {
  const { userId } = req.user

  UserShowModel.find({ userId })
    .then(data =>
      data.reduce((acc, item) => {
        acc.push(item.showId)
        return acc
      }, [])
    )
    .then(ids =>
      // tmdb does not support multiget
      // request away every show separately!
      Promise.all(ids.map(id =>
        ServiceShowModel.one({ id }))
      )
    )
    .then(data => res.json(data))
    .catch(next)
}
