import mdb from 'utils/services/moviedb'

class ServiceShowModel {
  discover (query) {
    return mdb('discoverTv', query)
  }
}

export default new ServiceShowModel()
