module.exports = {
	semi: false,
	trailingComma: 'es5',
	singleQuote: true,
	tabWidth: 2,
	useTabs: true,
	overrides: [
		{
			files: '*.json',
			options: {
				useTabs: false,
			},
		},
	],
	plugins: [require('prettier-plugin-tailwindcss')],
}
