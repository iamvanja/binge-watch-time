import Model from './BaseDbModel'

class UserModel extends Model {
  constructor () {
    super('user', 'user_id')
  }

  omitFields (user) {
    return {
      ...user,
      password: undefined,
      verificationCode: undefined,
      isVerified: undefined
    }
  }
}

export default new UserModel()
