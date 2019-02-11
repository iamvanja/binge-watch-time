import UserModel from 'models/UserModel'
import { verifyPassword } from 'utils/encryption/password'
import {
  UserAuthenticationFailed,
  UserError
} from 'utils/throwables'

export const login = (req, res, next) => {
  const { email, password, keepAlive } = req.body

  UserModel.findOne({ email })
    .then(users => {
      if (!users.length) {
        throw new UserAuthenticationFailed()
      }

      return users[0]
    })
    .then(async (user) => {
      const isValidPassword = await verifyPassword(password, user.password)
      if (!isValidPassword) {
        throw new UserAuthenticationFailed()
      }

      if (!user.isVerified) {
        throw new UserAuthenticationFailed('You must verify your email first.')
      }

      return user
    })
    .then(UserModel.omitFields)
    // login!
    .then(({ userId, ...user }) => {
      const sessionPayload = req.login({ userId }, keepAlive === 'true')

      return {
        ...user,
        ...sessionPayload // (userId and timeout)
      }
    })
    .then(user => res.json(user))
    .catch(next)
}

export const verify = (req, res, next) => {
  const { email, verificationCode } = req.body

  UserModel.findOne({
    email, verificationCode, isVerified: false
  })
    .then(users => {
      if (!users.length) {
        throw new UserError('Unable to verify. This account may have been verified already.')
      }

      return users[0]
    })
    .then(user => UserModel.update(user.userId, { isVerified: true }))
    .then(result => {
      if (result.affectedRows !== 1) {
        throw new UserError('Something went wrong.')
      }
      return res.status(201).send('Verified')
    })
    .catch(next)
}

export const me = (req, res, next) => {
  const { userId } = req.user

  UserModel.findOne({ userId })
    .then(users => res.json(UserModel.omitFields(users[0])))
    .catch(next)
}

export const logout = (req, res) => {
  req.logout()
  res.sendStatus(200)
}
