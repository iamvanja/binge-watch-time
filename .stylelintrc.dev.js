let stylelintrc = require('./.stylelintrc')

let ERROR_LEVEL = process.env.STYLELINT_DEV_LEVEL

if (!['off', 'warning', 'error'].includes(ERROR_LEVEL)) {
  ERROR_LEVEL = 'warning'
}

console.log('STYLELINT_DEV_LEVEL:', ERROR_LEVEL)

// extend here rules and options
const devRules = {}
const devOptions = {}

switch (ERROR_LEVEL) {
  case 'warning':
    // for warning let build succeed
    devOptions.defaultSeverity = ERROR_LEVEL
    break;
  case 'off':
    // stylelint does not provide this out-of-the-box so
    // we use an empty config
    stylelintrc = {}
    break;
}

module.exports = Object.assign({}, stylelintrc, devOptions)
