import mdb from 'utils/services/moviedb'

class ServiceShowModel {
  findOne (id) {
    return mdb('tvInfo', {
      id,
      appendToResponse: 'external_ids,videos'
    })
      .then(data => ({
        ...data,
        videos: data.videos.results || []
      }))
  }

  discover (query) {
    return mdb('discoverTv', query)
  }

  search (query) {
    return mdb('searchTv', query)
  }
}

export default new ServiceShowModel()
