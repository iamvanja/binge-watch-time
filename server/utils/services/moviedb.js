import moviedb from 'moviedb'
import { MOVIE_DB_API_KEY } from 'config/env'
import limits from 'limits.js'
import mapKeys from 'lodash/mapKeys'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import snakeCase from 'lodash/snakeCase'
import camelCase from 'lodash/camelCase'

const _mdb = moviedb(MOVIE_DB_API_KEY)
const throttle = limits().within(10 * 1000, 39)
const queue = []
let waitingForToken = false
let haveToken = false

const getToken = () =>
  new Promise((resolve, reject) => {
    if (haveToken) {
      return resolve()
    }
    if (waitingForToken) {
      return queue.push(resolve)
    }

    waitingForToken = true
    _mdb.requestToken((err) => {
      throttle.push(() => {})
      if (err) {
        return reject(err)
      }
      haveToken = true
      waitingForToken = false
      resolve()
      queue.map(cb => cb())
      queue.length = 0
    })
  })

const camelToSnakeCase = (camelObj = {}) =>
  mapKeys(camelObj, (value, key) =>
    key
      .split('.')
      .map(keyPart => snakeCase(keyPart))
      .join('.')
  )

const mapKeysDeep = obj => {
  const mappedObj = {}
  const getValue = (value) =>
    isArray(value)
      ? value.map(item => getValue(item))
      : isObject(value)
        ? mapKeysDeep(value)
        : value

  for (const key in obj) {
    mappedObj[camelCase(key)] = getValue(obj[key])
  }

  return mappedObj
}

const mdb = (method, query) =>
  getToken()
    .then(() =>
      new Promise((resolve, reject) => {
        throttle.push(() =>
          _mdb[method](camelToSnakeCase(query), (err, data) =>
            err
              ? reject(err)
              : resolve(mapKeysDeep(data))
          )
        )
      })
    )

export default mdb
