import Model from './BaseDbModel'

class MovieListModel extends Model {
  constructor () {
    super('movie_list', ['list_id'])
  }
}

export default new MovieListModel()
