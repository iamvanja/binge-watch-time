import isPlainObject from 'lodash/isPlainObject'
import snakeCase from 'lodash/snakeCase'
import camelCase from 'lodash/camelCase'
import mapKeys from 'lodash/mapKeys'
import db from '../utils/pg'

class Model {
  constructor (table, key) {
    this.table = table
    this.key = key
  }

  run (query, transformer) {
    return db.query(query)
      .then(res =>
        transformer
          ? transformer(res)
          : ({
            ...res,
            rows: res.rows.map(this.toCamel)
          })
      )
  }

  runSelect (query) {
    return this.run(query, res => res.rows.map(this.toCamel))
  }

  findOne (where) {
    const { keys, values, whereClause } = this.buildQuery(where)
    const sql = `SELECT * FROM "${this.table}" ${keys.length ? ' WHERE ' + whereClause : ''} LIMIT 1`

    return this.runSelect({ text: sql, values })
  }

  find (where, orderBy = '') {
    orderBy = orderBy && `ORDER BY ${orderBy}`
    const { keys, values, whereClause } = this.buildQuery(where)
    const sql = `SELECT * FROM "${this.table}" ${keys.length ? ' WHERE ' + whereClause : ''} ${orderBy}`

    return this.runSelect({ text: sql, values })
  }

  insert (data) {
    const normalizedData = this.normalizeWhere(data)
    const keys = Object.keys(normalizedData)
    const values = Object.values(normalizedData)

    const columns = keys.map(k => `"${k}"`).join(', ')
    const placeholders = keys.map((_, idx) => `$${idx + 1}`).join(', ')

    const query = {
      text: `INSERT INTO "${this.table}" (${columns}) VALUES (${placeholders}) RETURNING *`,
      values
    }

    return this.run(
      query,
      res => res.rows.length ? camelCase(res.rows[0][this.key]) : null
    )
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
  insertMultiple (rows, options = {}) {
    const { conflictKeys = [...this.key], isIgnore = false } = options
    const keys = Object.keys(rows[0])
    const columns = keys.map(k => `"${snakeCase(k)}"`).join(', ')
    const conflictClause = conflictKeys.map(k => `"${snakeCase(k)}"`).join(', ')
    const conflict = isIgnore ? `ON CONFLICT (${conflictClause}) DO NOTHING` : ''

    let values = []
    const valuePlaceholders = rows.map((row, rowIndex) => {
      const rowValues = keys.map(key => row[key])
      values = values.concat(rowValues)
      const offset = rowIndex * keys.length
      const placeholders = rowValues.map((_, colIndex) => `$${offset + colIndex + 1}`)
      return `(${placeholders.join(', ')})`
    }).join(', ')

    const query = {
      text: `
        INSERT INTO "${this.table}" (${columns})
        VALUES ${valuePlaceholders} ${conflict}
        RETURNING *
      `,
      values
    }

    return this.run(query)
  }

  insertIgnore (values) {
    return this.insertUpdate(values, { ignore: true })
  }

  insertUpdate (where, { conflictKeys = [...this.key], ignore = false } = {}) {
    const { keys, values } = this.buildQuery(where)
    const columns = keys.map(k => `"${k}"`).join(', ')
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ')
    const conflictClause = conflictKeys.map(k => `"${snakeCase(k)}"`).join(', ')
    const updates = keys
      .map((k) => `"${k}" = EXCLUDED."${k}"`)
      .join(', ')
    const doClause = ignore ? 'DO NOTHING' : `DO UPDATE SET ${updates}`

    const query = {
      text: `
        INSERT INTO "${this.table}" (${columns})
        VALUES (${placeholders})
        ON CONFLICT (${conflictClause})
        ${doClause}
        RETURNING *
      `,
      values
    }

    return this.run(query, res => res.rows.map(this.toCamel) || null)
  }

  update (where, values) {
    const { keys: whereKeys, values: whereValues } = this.buildQuery(where)
    const attrs = this.toSnake(values)
    const dataKeys = Object.keys(attrs)
    const dataValues = Object.values(attrs)
    const setClause = dataKeys
      .map((key, idx) => `"${key}" = $${idx + 1}`)
      .join(', ')
    const whereClause = whereKeys
      .map((key, idx) => `"${key}" = $${dataKeys.length + idx + 1}`)
      .join(' AND ')

    const query = {
      text: `UPDATE "${this.table}" SET ${setClause} WHERE ${whereClause} RETURNING *`,
      values: [...dataValues, ...whereValues]
    }

    return this.run(
      query,
      res => ({
        ...res,
        rows: res.rows.map(this.toCamel),
        affectedRows: res.rowCount
      })
    )
  }

  delete (where) {
    const { whereClause, values } = this.buildQuery(where)
    const query = {
      text: `DELETE FROM "${this.table}" WHERE ${whereClause} RETURNING *`,
      values
    }

    return this.run(query)
  }

  deleteMultiple (rows) {
    const keys = Object.keys(rows[0])
    const columns = keys.map(k => `"${snakeCase(k)}"`).join(', ')

    const values = []
    const valueTuples = rows.map((row, i) => {
      const placeholders = keys.map((_, j) => `$${i * keys.length + j + 1}`)
      values.push(...keys.map(k => row[k]))
      return `(${placeholders.join(', ')})`
    })

    const query = {
      text: `
        DELETE FROM "${this.table}"
        WHERE (${columns}) IN (${valueTuples.join(', ')})
        RETURNING *
      `,
      values
    }

    return this.run(query)
  }

  normalizeWhere (where) {
    if (
      !where ||
      (
        isPlainObject(where) &&
        Object.keys(where).length === 0)
    ) {
      return {}
    }
    const isInteger = Number.isInteger(parseInt(where))

    where = isInteger
      // either just a number (assumed where = { primary_key: id })
      ? { [this.key]: where }

      // or finally an actual object
      : this.toSnake(where)

    return where
  }

  buildQuery (where = {}) {
    const normalizedWhere = this.normalizeWhere(where)
    const keys = Object.keys(normalizedWhere)
    const values = Object.values(normalizedWhere)

    const whereClause = keys
      .map((key, idx) => `"${key}" = $${idx + 1}`)
      .join(' AND ')

    return { keys, values, whereClause }
  }

  toSnake (camelCaseObj) {
    if (!camelCaseObj) {
      return null
    }

    return mapKeys(camelCaseObj, (value, key) => snakeCase(key))
  }

  toCamel (snakeCaseObj) {
    if (!snakeCaseObj) {
      return null
    }

    return mapKeys(snakeCaseObj, (value, key) => camelCase(key))
  }
}

export default Model
