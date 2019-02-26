import UserShowEpisodeModel from 'models/UserShowEpisodeModel'
import { UserNotAllowed } from 'utils/throwables'
import omit from 'lodash/omit'

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

export const toggleSeasonEpisodesWatch = (req, res, next) => {
  const { season, user } = req
  const data = season.episodes.map(episode => ({
    userId: user.userId,
    showId: episode.showId,
    episodeId: episode.id,
    seasonNumber: season.seasonNumber,
    episodeNumber: episode.episodeNumber
  }))
  const modelMethod = req.method === 'PUT'
    ? 'insertMultiple'
    : req.method === 'DELETE'
      ? 'deleteMultiple'
      : null

  if (!modelMethod) {
    return next(new UserNotAllowed())
  }

  UserShowEpisodeModel[modelMethod](data, { isIgnore: true })
    .then(() => res.json(data))
    .catch(next)
}

export const watchedEpisodes = (req, res, next) => {
  const { userId } = req.user

  UserShowEpisodeModel.find({ userId })
    .then(data => data.map(
      item => omit(item, ['datetimeAdded', 'userId'])
    ))
    .then(omitted => res.json(omitted))
    .catch(next)
}
