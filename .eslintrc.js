module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'jest'],
  rules: {
    'react/prop-types': 'off',
    'no-unused-vars': 'warn'
  }
}
