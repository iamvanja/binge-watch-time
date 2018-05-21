import Model from './BaseModel'

class UserModel extends Model {
  constructor () {
    super('user_show', ['user_id', 'show_id'])
  }
}

export default new UserModel()
