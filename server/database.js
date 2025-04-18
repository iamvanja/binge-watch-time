
const options = {
  'defaultEnv': 'env-default',
  'env-default': {
    'driver': 'pg',
    'host': {
      'ENV': 'PG_HOST'
    },
    'user': {
      'ENV': 'PG_USER'
    },
    'password': {
      'ENV': 'PG_PASS'
    },
    'database': {
      'ENV': 'PG_DB'
    },
    'port': {
      'ENV': 'PG_PORT'
    }
  }
}

module.exports = options
