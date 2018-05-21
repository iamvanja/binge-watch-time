import isPlainObject from 'lodash/isPlainObject'
import snakeCase from 'lodash/snakeCase'
import mapKeys from 'lodash/mapKeys'
import db from 'utils/mysql'

class Model {
  constructor (table, key) {
    this.table = table
    this.key = key
  }

  findOne (where) {
    where = this.normalizeWhere(where)
    const sql = `SELECT * FROM \`${this.table}\` ${where} LIMIT 1`
    return db.select(sql)
  }

  find (where, orderBy = '') {
    orderBy = orderBy && `ORDER BY ${orderBy}`
    where = this.normalizeWhere(where)
    const sql = `SELECT * FROM \`${this.table}\` ${where} ${orderBy}`
    return db.select(sql)
  }

  list (orderBy) {
    orderBy = orderBy && `ORDER BY ${orderBy}`
    const sql = `SELECT * FROM \`${this.table}\` ${orderBy}`
    return db.select(sql)
  }

  insert (values) {
    const attrs = this.fixCase(values)
    return db.insert(this.table, attrs)
      .then(response => response.insertId)
  }

  insertMultiple (values) {
    const attrs = values.map(value => this.fixCase(value))
    const cols = Object.keys(attrs[0])
    return db.insertMultiple(this.table, cols, attrs)
      .then(response => response)
  }

  insertIgnore (values) {
    const attrs = this.fixCase(values)
    return db.insertIgnore(this.table, attrs)
      .then(response => response.insertId)
  }

  insertUpdate (values) {
    const attrs = this.fixCase(values)
    return db.insertUpdate(this.table, attrs)
      .then(response => response.insertId)
  }

  update (where, values) {
    const attrs = this.fixCase(values)
    where = this.normalizeWhere(where)
    return db.update(this.table, attrs, where)
  }

  delete (where) {
    where = this.normalizeWhere(where)
    return db.delete(this.table, where)
  }

  count (where) {
    where = this.normalizeWhere(where)
    const sql = `SELECT COUNT(*) as total FROM \`${this.table}\` ${where} LIMIT 1`
    return db.select(sql)
      .then(results => results.total)
  }

  normalizeWhere (where) {
    if (
      !where ||
      (
        isPlainObject(where) &&
        Object.keys(where).length === 0)
    ) {
      return ''
    }
    const isInteger = Number.isInteger(parseInt(where))

    // string based where 'WHERE column = value'
    if (typeof where === 'string' && !isInteger) {
      return where
    }
    where = isInteger
      // either just a number (assumed where = { primary_key: id })
      ? { [this.key]: where }

      // or finally an actual object
      : this.fixCase(where)

    return db.sqlWhere(where)
  }

  fixCase (camelCaseObj) {
    if (!camelCaseObj) {
      return null
    }

    return mapKeys(camelCaseObj, (value, key) => snakeCase(key))
  }
}

export default Model
