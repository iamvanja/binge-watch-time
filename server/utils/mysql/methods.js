import * as utils from './utils'

const opts = {}

/**
 * Build and run an INSERT statement
 */
const insert = (table, values = {}) => {
  const sql = `INSERT INTO \`${table}\` SET ${utils.prepareInsertValues(values)}`
  return query(sql)
    .then(({ results }) => results)
}

/**
 * Run a SELECT statement
 */
const select = (sql, values = {}) =>
  query(sql, values)
    .then(({ results }) => results)

/**
 * Build and run an UPDATE statement
 */
const update = (table, values, where) => {
  const sql = `UPDATE \`${table}\` SET ${utils.prepareInsertValues(values)} ${utils.sqlWhere(where)}`
  return query(sql)
    .then(({ results }) => results)
}

const query = (sql) => {
  return new Promise((resolve, reject) => {
    opts.conn.query(sql, (error, results, fields) => {
      if (error) {
        reject(error)
      } else {
        if (typeof opts.transformResults === 'function') {
          results = opts.transformResults(sql, results)
        }

        resolve({ results, fields })
      }
    })
  })
}

const augment = (connection, transformResults) => {
  opts.conn = connection
  opts.transformResults = transformResults

  return {
    insert,
    select,
    update,
    sqlWhere: utils.sqlWhere
  }
}

export default augment
