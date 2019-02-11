import Model from './BaseDbModel'

class UserPasswordTokenModel extends Model {
  constructor () {
    super('user_password_token', 'id')
  }
}

export default new UserPasswordTokenModel()
