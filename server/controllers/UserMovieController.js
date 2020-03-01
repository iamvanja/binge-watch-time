import UserMovieModel from 'models/UserMovieModel'
import ServiceMovieModel from 'models/ServiceMovieModel'
import { UserNotAllowed } from 'utils/throwables'

export const toggleStar = (req, res, next) => {
  const { userId } = req.user
  const { movieId } = req.params
  const { listId } = req.body
  let data = { userId, movieId }
  let modelMethod

  if (req.method === 'PUT') {
    modelMethod = 'insertUpdate'
    data.listId = listId
  } else if (req.method === 'DELETE') {
    modelMethod = 'delete'
  } else {
    return next(new UserNotAllowed())
  }

  UserMovieModel[modelMethod](data)
    .then(() => res.sendStatus(204))
    .catch(next)
}

export const starredMovies = (req, res, next) => {
  const { userId } = req.user

  UserMovieModel.find({ userId })
    .then(data => data.reduce((total, currentItem) => {
      const { listId, movieId } = currentItem
      if (!total[listId]) {
        total[listId] = []
      }

      total[listId].push(movieId)

      return total
    }, {}))
    .then(data => res.json(data))
    .catch(next)
}

export const starredMoviesByList = (req, res, next) => {
  const { userId } = req.user
  const { listId } = req.params

  UserMovieModel.find({ userId, listId })
    .then(data => data.map(movie => movie.movieId))
    .then((movieIds = []) => {
      const promises = movieIds.map(id => ServiceMovieModel.one({ id }))
        .map(p => p.catch(() => undefined)) // swallow errors

      return Promise.all(promises)
    })
    .then(data => res.json(data))
    .catch(next)
}
