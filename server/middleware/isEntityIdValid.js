import { NotFound } from 'utils/throwables'
import UserShowModel from 'models/UserShowModel'
import UserMovieModel from 'models/UserMovieModel'
import ServiceShowModel from 'models/ServiceShowModel'
import ServiceMovieModel from 'models/ServiceMovieModel'

const idPropertyByEntity = {
  show: 'showId',
  movie: 'movieId'
}
const dbModelByEntity = {
  show: UserShowModel,
  movie: UserMovieModel
}
const serviceModelByEntity = {
  show: ServiceShowModel,
  movie: ServiceMovieModel
}

const isEntityIdValid = entityName => (req, res, next) => {
  const { params } = req
  const idProperty = idPropertyByEntity[entityName]
  const id = params[idProperty]
  const DbModel = dbModelByEntity[entityName]
  const ServiceModel = serviceModelByEntity[entityName]

  DbModel.find({ [idProperty]: id })
    .then(localData => {
      if (localData.length) {
        throw new Error('ok')
      }
    })
    .then(() => ServiceModel.one({ id }))
    .then((remoteData = {}) => {
      if (remoteData.id) {
        throw new Error('ok')
      }
    })
    .catch(err =>
      err.message === 'ok'
        ? next()
        : next(new NotFound())
    )
}

export default isEntityIdValid
