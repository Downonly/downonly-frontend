/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			white: '#ffffff',
			black: '#000000',
			cole: '#191919',
			carbon: '#282828',
			snow: '#f2f2f2',
			iron: '#c0c0c0',
			tomato: 'tomato',
			current: 'currentColor',
			inherit: 'inherit',
		},
		fontFamily: {
			display: ['var(--font-display)', 'system-ui', 'sans-serif'],
			body: ['var(--font-body)', 'system-ui', 'sans-serif'],
		},
	},
	plugins: [],
}
