import mysql from 'mysql'
import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import methods from './methods'
import { typeCast } from './utils'
import {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_DB,
  MYSQL_SSL
} from 'config/env'

const connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASS,
  database: MYSQL_DB,
  ssl: MYSQL_SSL,
  typeCast
})

/**
 * Convert underscore_case property names to camelCase
 */
const transformResults = (sql, results) => {
  if (!sql.trim().match(/^SELECT/)) {
    return results
  }

  return results.map(obj => mapKeys(obj, (v, k) => camelCase(k)))
}

const db = {
  ...connection,
  ...methods(connection, transformResults)
}

export default db
