module.exports = {
  extends: ['stylelint-config-standard'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'value-list-comma-newline-after': 'never-multi-line',
    'value-list-comma-space-after': 'always-single-line',
    'rule-empty-line-before': ['always', {
      except: ['inside-block']
    }],
    'selector-combinator-space-after': 'never'
  }
}
