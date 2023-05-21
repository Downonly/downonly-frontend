/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			white: '#ffffff',
			dew: '#fafafa',
			snow: '#f2f2f2',
			iron: '#c0c0c0',
			nickel: '#2f2f2f',
			carbon: '#282828',
			cole: '#191919',
			black: '#000000',
			tomato: 'tomato',
			current: 'currentColor',
			inherit: 'inherit',
		},
		fontFamily: {
			display: ['var(--font-display)', 'system-ui', 'sans-serif'],
			body: ['var(--font-body)', 'system-ui', 'sans-serif'],
		},
		extend: {
			aspectRatio: {
				'4/3': '4/3',
			},
		},
	},
	plugins: [],
}
