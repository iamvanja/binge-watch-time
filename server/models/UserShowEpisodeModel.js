import Model from './BaseModel'

class UserModel extends Model {
  constructor () {
    super('user_show_episode', ['user_id', 'show_id', 'episode_id'])
  }
}

export default new UserModel()
