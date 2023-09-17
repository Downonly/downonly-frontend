/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
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
				'down-new-left':
					'down-new-left 0.4s cubic-bezier(0.6, 1.4, 0, 0.9) both',
				'down-new-right':
					'down-new-right 0.4s cubic-bezier(0.6, 1.4, 0, 0.9) both',
				'down-old-left':
					'down-old-left 0.4s cubic-bezier(0.11, 0, 0.5, 0) both',
				'down-old-right':
					'down-old-right 0.4s cubic-bezier(0.11, 0, 0.5, 0) both',
				wiggle: 'wiggle 4s ease-in-out infinite',
			},
			keyframes: {
				'down-new-left': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-100%) rotate(0.005turn)',
					},
					'100%': {
						opacity: '1',
						transform: 'none',
					},
				},
				'down-new-right': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-100%) rotate(-0.01turn)',
					},
					'100%': {
						opacity: '1',
						transform: 'none',
					},
				},
				'down-old-left': {
					'0%': {
						opacity: '1',
						transform: 'none',
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(100%) rotate(-0.005turn)',
					},
				},
				'down-old-right': {
					'0%': {
						opacity: '1',
						transform: 'none',
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(-100%) rotate(0.01turn)',
					},
				},
				wiggle: {
					'0%, 100%': { transform: 'translateY(-5%)' },
					'50%': { transform: 'translateY(5%)' },
				},
			},
		},
	},
	plugins: [],
}
