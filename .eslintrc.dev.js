const eslintrc = require('./.eslintrc')

let ERROR_LEVEL = process.env.ESLINT_DEV_LEVEL

if (!['off', 'warn', 'error', 0, 1, 2].includes(ERROR_LEVEL)) {
  ERROR_LEVEL = 'warn'
}

console.log('ESLINT_DEV_LEVEL:', ERROR_LEVEL)

// Define development-only rules for frictionless development
const devRules = {
  complexity: [ERROR_LEVEL, eslintrc.rules.complexity[1]],
  'object-curly-spacing': [ERROR_LEVEL, 'always'],
  'max-len': [ERROR_LEVEL, eslintrc.rules['max-len'][1]],
  'no-console': ERROR_LEVEL,

  // defined in standard
  'no-unused-vars': ERROR_LEVEL,
  'no-multiple-empty-lines': ERROR_LEVEL,
  'import/first': ERROR_LEVEL,
  'keyword-spacing': ERROR_LEVEL,
  'indent': ERROR_LEVEL,
  'handle-callback-err': ERROR_LEVEL
}

// front-end only
if (process.env.ESLINT_MODE !== 'node') {
  devRules['react/prop-types'] = ERROR_LEVEL
  devRules['react/no-unused-prop-types'] = ERROR_LEVEL
}

/**
 * Export new object while merging production and development rules.
 *
 * Development rules overwrite the production ones if same rule is defined.
 */
const final = Object.assign({}, eslintrc, {
  rules: Object.assign({}, eslintrc.rules, devRules)
})

module.exports = final
