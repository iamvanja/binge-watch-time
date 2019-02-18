const options = {
  'defaultEnv': 'env-default',
  'env-default': {
    'driver': 'mysql',
    'host': {
      'ENV': 'MYSQL_HOST'
    },
    'user': {
      'ENV': 'MYSQL_USER'
    },
    'password': {
      'ENV': 'MYSQL_PASS'
    },
    'database': {
      'ENV': 'MYSQL_DB'
    },
    'multipleStatements': true
  }
}
const { MYSQL_SSL } = process.env
const ssl = MYSQL_SSL
  ? MYSQL_SSL === 'true'
    ? true
    : MYSQL_SSL
  : undefined
options[options.defaultEnv].ssl = ssl

module.exports = options
