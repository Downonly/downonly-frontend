module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:prettier/recommended', 'plugin:@next/next/recommended'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'], // Your TypeScript files extension
			parser: '@typescript-eslint/parser',
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: ['./tsconfig.json'],
			},
			extends: [
				'plugin:react/recommended',
				'plugin:@typescript-eslint/recommended-type-checked',
				'plugin:@typescript-eslint/stylistic-type-checked',
				'plugin:prettier/recommended',
				'next/core-web-vitals',
				'plugin:tailwindcss/recommended',
			],
			rules: {
				'@typescript-eslint/ban-ts-comment': 'off',
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/restrict-template-expressions': 'off',
				'@typescript-eslint/strict-boolean-expressions': 'off',
				'@typescript-eslint/triple-slash-reference': 'off',
				'prettier/prettier': 'off',
				'tailwindcss/no-custom-classname': [
					'error',
					{
						whitelist: ['do\\-.+'],
					},
				],
			},
		},
	],
	plugins: ['react', 'prettier'],
	rules: {
		'prettier/prettier': 'off',
	},
}
