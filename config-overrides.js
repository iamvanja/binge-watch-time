const StylelintPlugin = require('stylelint-webpack-plugin')

const getCustomEsLint = existingConfig => {
  const newEsLintOptions = Object.assign({}, existingConfig, {
    eslintPath: require.resolve('eslint'),
    configFile: '.eslintrc.dev.js'
  })
  delete newEsLintOptions.baseConfig
  delete newEsLintOptions.ignore
  delete newEsLintOptions.useEslintrc

  return newEsLintOptions
}

module.exports = {
  webpack: function (config, env) {
    if (env === 'development') {
      config.plugins.push(
        new StylelintPlugin({
          configFile: '.stylelintrc.dev.js'
        })
      )

      // Customize ESLint
      // Currently this is the first rule in the config
      // If CRA changes the order, this will have to be updated
      config.module.rules[0].use[0].options = getCustomEsLint(
        config.module.rules[0].use[0].options
      )
    }

    return config
  },
  jest: function (config) {
    const customConfig = require('./jest.config')
    return customConfig
  }
  // devServer: function(configFunction) {
  //   return function(proxy, host) {
  //     // customize devServer config here
  //     return config;
  //   }
  // }
}
