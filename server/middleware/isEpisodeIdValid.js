import { NotFound } from 'utils/throwables'
import UserShowEpisodeModel from 'models/UserShowEpisodeModel'
import ServiceShowEpisodeModel from 'models/ServiceShowEpisodeModel'

const isEpisodeValid = (req, res, next) => {
  const { showId, seasonNumber, episodeNumber } = req.params

  UserShowEpisodeModel.find({ showId, seasonNumber, episodeNumber })
    .then(localData => {
      if (localData.length) {
        req.episodeId = localData[0].episodeId
      }
    })
    .then(() =>
      req.episodeId
        ? {}
        : ServiceShowEpisodeModel.one({
          id: showId, seasonNumber, episodeNumber
        })
    )
    .then((response = {}) => {
      if (response.id) {
        req.episodeId = response.id
      }
    })
    .then(() =>
      !req.episodeId
        ? next(new NotFound())
        : next()
    )
    .catch(next)
}

export default isEpisodeValid
