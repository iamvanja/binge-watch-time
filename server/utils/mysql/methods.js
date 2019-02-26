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
 * Insert multiple values in one statement. This method creates an sql statement similar to:
 *  INSERT INTO table
 *    (a,b,c)
 *  VALUES
 *    (1,2,3),
 *    (4,5,6),
 *    (7,8,9);
 */
const insertMultiple = (table, objects, options = {}) => {
  let { cols } = options
  // If only two arguments are passed, the second argument becomes objects
  // and we will derive `cols` from the first object
  if (cols === undefined) {
    cols = Object.keys(objects[0])
  }
  const values = utils.prepareMultipleValues(objects, cols)

  const sql = `INSERT ${options.isIgnore ? 'IGNORE' : ''} INTO \`${table}\` (\`${cols.join('`,`')}\`) VALUES ${values.join(',')}`

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
 * Build and run a DELETE statement for multiple rows at once
 */
const deleteQueryMultiple = (table, objects, cols) => {
  // If only two arguments are passed, the second argument becomes objects
  // and we will derive `cols` from the first object
  if (cols === undefined) {
    cols = Object.keys(objects[0])
  }
  const values = utils.prepareMultipleValues(objects, cols)

  // DELETE FROM table WHERE(col1, col2) IN((1, 2), (3, 4), (5, 6))
  const sql = `DELETE FROM \`${table}\` WHERE (\`${cols.join('`,`')}\`) IN (${values.join(',')})`

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
    insertMultiple,
    select,
    update,
    delete: deleteQuery,
    deleteMultiple: deleteQueryMultiple,
    sqlWhere: utils.sqlWhere
  }
}

export default augment
