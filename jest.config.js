module.exports = {
  'testMatch': [
    '<rootDir>/**/?(*.)(spec|test).{js,jsx,mjs}'
  ],
  'modulePaths': [
    '<rootDir>/',
    '<rootDir>/src',
    '<rootDir>/server'
  ],
  'setupFiles': [
    '<rootDir>/node_modules/react-scripts/config/polyfills.js'
  ],
  'setupTestFrameworkScriptFile': '<rootDir>/setupTests.js',
  'testURL': 'http://localhost',
  'transform': {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/node_modules/react-scripts/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/node_modules/react-scripts/config/jest/fileTransform.js'
  },
  'transformIgnorePatterns': [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'
  ],
  'moduleNameMapper': {
    '^react-native$': 'react-native-web'
  },
  'moduleFileExtensions': [
    'web.js',
    'mjs',
    'js',
    'json',
    'web.jsx',
    'jsx',
    'node'
  ]
}
