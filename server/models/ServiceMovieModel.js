import mdb from 'utils/services/moviedb'

class ServiceMovieModel {
  discover (query) {
    return mdb('discoverMovie', query)
  }
}

export default new ServiceMovieModel()
