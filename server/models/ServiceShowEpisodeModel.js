import mdb from 'utils/services/moviedb'

class ServiceShowEpisodeModel {
  search (query) {
    return mdb('tvSeasonInfo', query)
  }
}

export default new ServiceShowEpisodeModel()
