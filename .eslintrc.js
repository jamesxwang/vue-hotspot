/**
 * @file .eslintrc.js
 * @author James Wang <github.com/jamesxwang>
 */

module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ['plugin:vue/essential', '@vue/standard'],

  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
