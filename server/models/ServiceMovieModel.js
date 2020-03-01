import mdb from 'utils/services/moviedb'

class ServiceMovieModel {
  one (query = {}) {
    return mdb('movieInfo', {
      appendToResponse: 'videos',
      ...query
    })
      .then(({ videos, ...rest }) => ({
        ...rest,
        videos: videos.results || []
      }))
  }

  discover (query) {
    return mdb('discoverMovie', query)
  }

  search (query) {
    return mdb('searchMovie', query)
  }
}

export default new ServiceMovieModel()
