import Model from './BaseDbModel'

class UserModel extends Model {
  constructor () {
    super('user_movie', ['user_id', 'movie_id'])
  }
}

export default new UserModel()
