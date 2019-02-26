import UserModel from 'models/UserModel'
import UserPasswordTokenModel from 'models/UserPasswordTokenModel'
import logger from 'logger'
import uuid from 'uuid'
import moment from 'moment'
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

export const passwordResetRequest = (req, res, next) => {
  const { email } = req.body
  let user = {}
  let newToken

  UserModel.findOne({ email })
    .then(users => {
      if (!users.length) {
        throw new UserError('No user found by email: ' + email)
      }
      user = users[0]

      return user
    })
    .then(user => {
      newToken = uuid.v4()
      return UserPasswordTokenModel.insert({
        userId: user.userId,
        token: newToken
      })
    })
    .then(recordId => {
      if (!recordId) {
        throw new Error('Unable to insert a record.')
      }

      return sendEmail.forgotPasswordRequest({
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        token: newToken
      })
    })
    .catch(err => {
      logger.log('error', 'Error while requesting password', err)
    })
    .then(() => res.sendStatus(204))
}

export const passwordReset = (req, res, next) => {
  const { email, token, password } = req.body
  const throwGenericError = () => {
    throw new UserError('Unable to verify.')
  }
  let user
  let tokenToUse

  UserModel.findOne({ email })
    .then(users => {
      if (!users.length) {
        throwGenericError()
      }
      user = users[0]
    })
    .then(() => UserPasswordTokenModel.find({ token, isUsed: false }))
    .then(tokens => {
      if (!tokens.length) {
        throwGenericError()
      }
      tokenToUse = tokens[0]

      if (tokenToUse.userId !== user.userId) {
        throwGenericError()
      }

      const isLessThan24hours = moment.utc(tokenToUse.dateTimeAdded)
        .isAfter(moment.utc().subtract(24, 'hours'))

      if (!isLessThan24hours) {
        throwGenericError()
      }

      return tokenToUse
    })
    .then(async () => UserModel.update(user.userId, {
      password: await createPasswordHash(password)
    }))
    .then(result => {
      if (result.affectedRows !== 1) {
        throwGenericError()
      }
    })
    .then(() => UserPasswordTokenModel.update(tokenToUse.id, { isUsed: true }))
    .then(result => {
      if (result.affectedRows !== 1) {
        throwGenericError()
      }
    })
    .then(() => res.sendStatus(204))
    .catch(next)
}
