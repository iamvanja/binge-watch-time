import UserShowModel from 'models/UserShowModel'
import ServiceShowModel from 'models/ServiceShowModel'
import { UserNotAllowed } from 'utils/throwables'
import * as promiseUtils from 'utils/promise'

export const toggleStar = (req, res, next) => {
  const { userId } = req.user
  const { showId } = req.params
  const { listId } = req.body
  let data = { userId, showId }
  let modelMethod

  if (req.method === 'PUT') {
    modelMethod = 'insertUpdate'
    data.listId = listId
  } else if (req.method === 'DELETE') {
    modelMethod = 'delete'
  } else {
    return next(new UserNotAllowed())
  }

  UserShowModel[modelMethod](data)
    .then(() => res.sendStatus(204))
    .catch(next)
}

export const starredShows = (req, res, next) => {
  const { userId } = req.user

  UserShowModel.find({ userId })
    .then(data => data.reduce((total, currentItem) => {
      const { listId, showId } = currentItem
      if (!total[listId]) {
        total[listId] = []
      }

      total[listId].push(showId)

      return total
    }, {}))
    .then(data => res.json(data))
    .catch(next)
}

export const starredShowsByList = (req, res, next) => {
  const { userId } = req.user
  const { listId } = req.params

  UserShowModel.find({ userId, listId })
    .then(data => data.map(show => show.showId))
    .then((showIds = []) => {
      const promises = showIds.map(id =>
        promiseUtils.retry(
          () => ServiceShowModel.one({ id }), {
            retryCount: 10,
            interval: 200
          })
      )

      return Promise.all(promises)
    })
    .then(data => res.json(data))
    .catch(next)
}
