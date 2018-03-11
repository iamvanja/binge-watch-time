import { createHash, createSalt, verifyHash } from './bcrypt'

export const createPasswordHash = password =>
  createSalt()
    .then(salt => createHash(password, salt))

export const verifyPassword = (password, hashedPassword) =>
  verifyHash(password, hashedPassword)
