import { Is, Schema, errorFormat } from 'house-rules'

export const name = Is.string().ascii().required()

const schema = new Schema({
  firstName: name.maxLength(30),
  lastName: name.maxLength(30),
  email: Is.string().email().required(),
  password: Is.string().minLength(6).maxLength(100).required()
}).onError(errorFormat.combine)

export default schema
