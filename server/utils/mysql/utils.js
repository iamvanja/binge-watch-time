import mysql from 'mysql'

/**
 * Casts tiny(1) into boolean
 */
export const typeCast = (field, next) => {
  if (field.type === 'TINY' && field.length === 1) {
    return field.string() === '1' // 1 = true, 0 = false
  }
  return next()
}

/**
 * Turns 'foo', into '\'foo\''
 */
export const escape = value => mysql.escape(value)

const stringifyObject = (obj, {
  separator = ',',
  handleIsNull = false
} = {}) => {
  const arr = []
  const normalizeValue = value =>
    value === null && handleIsNull
      ? 'IS NULL'
      : `= ${escape(value)}`

  if (typeof obj === 'string') {
    return obj
  }

  for (let key in obj) {
    arr.push(`\`${key}\` ${normalizeValue(obj[key])}`)
  }

  return arr.join(separator)
}

/**
 * Turns {first_name: 'John', last_name: 'Doe'} into
 *       `first_name` = 'John', `last_name` = 'Doe'
 */
export const prepareInsertValues = (values = {}) =>
  typeof values === 'string'
    ? ''
    : stringifyObject(values)

/**
 * Turns [
 * {id: 1, foreign_id: 100},
 * {id: 2, foreign_id: 101}
 *  ] into
 *  ['(1, 100)', '(2, 101)']
 *
 */
export const prepareMultipleValues = (objects = [], cols = []) =>
  objects.map(obj => {
    const uniformObj = []

    cols.forEach(col => {
      uniformObj.push(obj[col] || 'null')
    })

    return `(${uniformObj.join(',')})`
  })

/**
 * Turns {user_id: 1, age: null}, into "WHERE `user_id` = 1 AND `age` IS NULL"
 */
export const sqlWhere = (where = '') => {
  const stringified = stringifyObject(where, {
    separator: ' AND ',
    handleIsNull: true
  })

  return stringified.length && !stringified.startsWith('WHERE')
    ? `WHERE ${stringified}`
    : stringified
}
