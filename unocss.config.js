import { defineConfig, presetMini, presetWebFonts } from 'unocss'

export default defineConfig({
	presets: [
		presetMini({
			dark: 'media',
			theme: {
				colors: {
					black: '#191919',
					white: '#f2f2f2',
				},
			},
		}),
		presetWebFonts({
			provider: 'none',
			fonts: {
				body: 'var(--font-body)',
				display: ['var(--font-display)'],
			},
		}),
	],
	cli: {
		entry: {
			patterns: './**/*.tsx',
			outFile: 'src/app/uno.css',
		},
	},
})
