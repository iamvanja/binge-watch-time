import mdb from 'utils/services/moviedb'

class ServiceShowModel {
  one (query = {}) {
    return mdb('tvInfo', {
      appendToResponse: 'external_ids,videos',
      ...query
    })
      .then(({ videos, ...rest }) => ({
        ...rest,
        videos: videos.results || []
      }))
  }

  discover (query) {
    return mdb('discoverTv', query)
  }

  search (query) {
    return mdb('searchTv', query)
  }

  topRated (query) {
    return mdb('miscTopRatedTvs', query)
  }
}

export default new ServiceShowModel()
