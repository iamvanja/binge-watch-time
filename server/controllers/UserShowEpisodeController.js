import UserShowEpisodeModel from 'models/UserShowEpisodeModel'
import { UserNotAllowed } from 'utils/throwables'

export const toggleEpisodeWatch = (req, res, next) => {
  const { userId } = req.user
  const { showId, seasonNumber, episodeNumber } = req.params
  const { episodeId } = req
  const data = { userId, showId, seasonNumber, episodeNumber, episodeId }
  const modelMethod = req.method === 'PUT'
    ? 'insertIgnore'
    : req.method === 'DELETE'
      ? 'delete'
      : null

  if (!modelMethod) {
    return next(new UserNotAllowed())
  }

  UserShowEpisodeModel[modelMethod](data)
    .then(() => res.sendStatus(204))
    .catch(next)
}

export const watchedEpisodes = (req, res, next) => {
  const { userId } = req.user

  UserShowEpisodeModel.find({ userId })
    .then(data => res.json(data))
    .catch(next)
}
