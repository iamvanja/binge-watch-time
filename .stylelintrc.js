module.exports = {
  processors: [],
  extends: [
    'stylelint-config-standard',
  ],
  rules: {
    'selector-pseudo-element-colon-notation': 'single',
    'font-family-no-missing-generic-family-keyword': null,
    'at-rule-no-unknown': [true, {
      ignoreAtRules: [
        'include',
        'if',
        'else',
        'each',
        'for',
        'mixin',
        'content',
        'function'
      ]
    }]
  }
}
