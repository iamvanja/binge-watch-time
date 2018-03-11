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

const verification = async ({ name, verificationCode, email } = {}) => {
  // todo: save communication record and queue email(commLogId, jobContent)

  return sendEmail({
    subject: 'Please verify your email',
    toEmail: email,
    toName: name,
    content: await emailTemplate('verify', {
      name,
      verificationUrl: `${BASE_URL}/auth/verify?${queryString.stringify({ verificationCode, email })}`
    })
  })
}

export default {
  verification
}
