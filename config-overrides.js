const StylelintPlugin = require('stylelint-webpack-plugin')

const getConfigFile = (filename, env) =>
  filename.replace('{{ENV}}', env === 'development' ? '.dev' : '')

const getCustomEsLint = (existingConfig, env) => {
  const newEsLintOptions = Object.assign({}, existingConfig, {
    eslintPath: require.resolve('eslint'),
    configFile: getConfigFile('.eslintrc{{ENV}}.js', env),
    baseConfig: undefined,
    ignore: undefined,
    useEslintrc: undefined
  })

  return newEsLintOptions
}

module.exports = {
  webpack: function (config, env) {
    config.plugins.push(
      new StylelintPlugin({
        configFile: getConfigFile('.stylelintrc{{ENV}}.js', env)
      })
    )

    // Customize ESLint
    // Currently this is the first rule in the config
    // If CRA changes the order, this will have to be updated
    config.module.rules[0].use[0].options = getCustomEsLint(
      config.module.rules[0].use[0].options, env
    )

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
