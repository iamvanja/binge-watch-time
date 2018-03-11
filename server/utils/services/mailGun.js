import Mailgun from 'mailgun-js'
import {
  MAILER_FROM_EMAIL,
  MAILER_FROM_NAME,
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN
} from 'config/env'

const mailgun = Mailgun({
  apiKey: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN
})

const formatPerson = (name, email) =>
  name
    ? `${name} <${email}>`
    : email

export const sendEmail = ({
  subject,
  fromName = MAILER_FROM_NAME,
  fromEmail = MAILER_FROM_EMAIL,
  toEmail,
  toName,
  content
} = {}) => {
  // todo: validate data here
  return mailgun.messages()
    .send({
      from: formatPerson(fromName, fromEmail),
      to: formatPerson(toName, toEmail),
      subject,
      html: content
    })
    .then(body => ({
      messageId: body.id
    }))
    .catch(err => Promise.reject(err))
}
