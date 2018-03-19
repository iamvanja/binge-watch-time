const config = {
  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true
  },
  parser: 'babel-eslint',
  plugins: [
    'react',
    'jsx-a11y'
  ],
  extends: [
    'standard',
    'standard-react',
    'plugin:jsx-a11y/recommended'
  ],
  rules: {
    complexity: ['error', 10],
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', {
      code: 80,
      ignoreComments: true,
      ignoreStrings: true,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
    }],
    'no-console': 'error'
  }
}

const excludeReactRelated = array =>
  array.filter(conf => !conf.includes('react'))

if (process.env.ESLINT_MODE === 'node') {
  config.plugins = excludeReactRelated(config.plugins)
  config.extends = excludeReactRelated(config.extends)
}

module.exports = config;
