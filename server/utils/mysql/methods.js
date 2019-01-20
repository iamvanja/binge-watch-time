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
 * Try running an INSERT statement. If the record already exists,
 * ignore the request without error.
 */
const insertIgnore = (table, values) => {
  const sql = `INSERT IGNORE INTO \`${table}\` SET ${utils.prepareInsertValues(values)}`
  return query(sql)
}

/**
 * Try running an INSERT statement. If the record already exists, run an update statement.
 * This takes advantage of MySQL's `ON DUPLICATE KEY UPDATE` feature.
 */
const insertUpdate = (table, values = {}) => {
  values = utils.prepareInsertValues(values)
  const sql = `INSERT INTO \`${table}\` SET ${values} ON DUPLICATE KEY UPDATE ${values}`

  return query(sql)
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

/**
 * Build and run a DELETE statement
 */
const deleteQuery = (table, where) => {
  const sql = `DELETE FROM \`${table}\` ${utils.sqlWhere(where)}`

  return query(sql)
}

/**
 * Prepare and run a query with bound values. Return a promise
 */
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
    insertIgnore,
    insertUpdate,
    select,
    update,
    delete: deleteQuery,
    sqlWhere: utils.sqlWhere
  }
}

export default augment
