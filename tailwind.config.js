/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			white: '#ffffff',
			snow: '#f2f2f2',
			iron: '#c0c0c0',
			nickel: '#3a3a3a',
			carbon: '#282828',
			cole: '#191919',
			black: '#000000',
			tomato: 'tomato',
			current: 'currentColor',
			inherit: 'inherit',
			transparent: 'transparent',
		},
		fontFamily: {
			display: ['var(--font-display)', 'system-ui', 'sans-serif'],
			body: ['var(--font-body)', 'system-ui', 'sans-serif'],
		},
		extend: {
			aspectRatio: {
				'4/3': '4/3',
			},
			animation: {
				'down-left': 'down-left 0.4s cubic-bezier(0.6, 1.4, 0, 0.9) none',
				'down-right': 'down-right 0.4s cubic-bezier(0.6, 1.4, 0, 0.9) none',
			},
			keyframes: {
				'down-left': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-4rem) rotate(0.005turn)',
					},
					'100%': {
						opacity: '1',
						transform: 'none',
					},
				},
				'down-right': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-4rem) rotate(-0.01turn)',
					},
					'100%': {
						opacity: '1',
						transform: 'none',
					},
				},
			},
		},
	},
	plugins: [],
}
