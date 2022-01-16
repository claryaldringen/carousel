module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		sourceType: 'module'
	},
	plugins: ['react', 'jest', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
		'react/prop-types': 'off',
		'no-unused-vars': 'warn'
	}
}
