import pg from 'pg'
import {
  PG_HOST,
  PG_USER,
  PG_PASS,
  PG_DB,
  PG_PORT
} from '../../config/env'
import logger from '../../logger'

const { Pool } = pg

const pool = new Pool({
  user: PG_USER,
  password: PG_PASS,
  host: PG_HOST,
  post: PG_PORT,
  database: PG_DB
})

pool.connect()
  .then(() => {
    logger.info('DB connected!')
  })
  .catch(err => {
    logger.error('DB connect failed', err)
  })

export default pool
