/** @type {import('eslint').Linter.Config} */
const config = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/strict',
		'plugin:react/jsx-runtime',
		'prettier'
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
		ecmaFeatures: {
			jsx: true
		},
		project: true,
		tsconfigRootDir: __dirname
	},
	plugins: ['@typescript-eslint', 'react'],
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_'
			}
		],
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': ['error'],
		'no-console': [2, { allow: ['warn', 'error'] }]
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
};
module.exports = config;
