import mdb from 'utils/services/moviedb'

class ServiceShowEpisodeModel {
  search (query) {
    return mdb('tvSeasonInfo', query)
  }

  one (query) {
    return mdb('tvEpisodeInfo', query)
  }
}

export default new ServiceShowEpisodeModel()
