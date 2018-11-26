import { NotFound } from 'utils/throwables'
import UserShowModel from 'models/UserShowModel'
import ServiceShowModel from 'models/ServiceShowModel'

const isShowIdValid = (req, res, next) => {
  const { showId } = req.params

  UserShowModel.find({ showId })
    .then(localData => {
      if (localData.length) {
        throw new Error('ok')
      }
    })
    .then(() => ServiceShowModel.one({ id: showId }))
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

export default isShowIdValid
