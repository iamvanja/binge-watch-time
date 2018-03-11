import UserModel from 'models/UserModel'
import logger from 'logger'
import uuid from 'uuid'
import { createPasswordHash } from 'utils/encryption/password'
import { UserError } from 'utils/throwables'
import sendEmail from 'utils/sendEmail'

export const register = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body
  let user = {}

  UserModel.findOne({ email })
    .then(users => {
      if (users.length) {
        throw new UserError('E-mail address already exists in the system.')
      }
    })
    .then(async () => {
      user = {
        firstName,
        lastName,
        email,
        password: await createPasswordHash(password),
        verificationCode: uuid.v4()
      }
      return UserModel.insert(user)
    })
    .then(async (userId) => {
      user.userId = userId
      try {
        await sendEmail.verification({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          verificationCode: user.verificationCode
        })
      } catch (err) {
        logger.log('error', 'Unable to send verification email for userId:', userId)
      }

      return user
    })
    .then(({ userId }) => res.json({ userId }))
    .catch(next)
}

export const one = (req, res, next) => {
  const { userId } = req.params
  UserModel.findOne(userId)
    .then(users => res.json(users[0]))
    .catch(next)
}
