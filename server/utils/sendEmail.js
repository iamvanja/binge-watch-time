import path from 'path'
import queryString from 'query-string'
import ejs from 'ejs'
import { sendEmail } from 'utils/services/mailGun'
import { BASE_URL } from 'config/env'

const emailTemplate = (filename, data) =>
  new Promise((resolve, reject) => {
    ejs.renderFile(
      path.join(process.cwd(), '/server/views/emails', filename + '.ejs'),
      data,
      {},
      (err, content) =>
        err
          ? reject(err)
          : resolve(content.trim())
    )
  })

const verification = async (options = {}) => {
  const { name, verificationCode, email } = options
  // todo: save communication record and queue email(commLogId, jobContent)

  return sendEmail({
    subject: 'Please verify your email',
    toEmail: email,
    toName: name,
    content: await emailTemplate('verify', {
      name,
      verificationUrl: `${BASE_URL}/auth/verify?${queryString.stringify({
        verificationCode,
        email
      })}`
    })
  })
}

const forgotPasswordRequest = async (options = {}) => {
  const { name, token, email } = options

  return sendEmail({
    subject: 'Password reset',
    toEmail: email,
    toName: name,
    content: await emailTemplate('forgotPasswordRequest', {
      name,
      url: `${BASE_URL}/auth/forgot/verify?${queryString.stringify({
        token,
        email
      })}`
    })
  })
}

export default {
  verification,
  forgotPasswordRequest
}
