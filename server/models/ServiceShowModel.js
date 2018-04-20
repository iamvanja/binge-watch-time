import mdb from 'utils/services/moviedb'

class ServiceShowModel {
  one (query) {
    return mdb('tvInfo', query)
  }

  discover (query) {
    return mdb('discoverTv', query)
  }

  search (query) {
    return mdb('searchTv', query)
  }
}

export default new ServiceShowModel()
