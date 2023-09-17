'use client'

import { useState } from 'react'

export default function ThemeToggle(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	const updateBodyClass = (isDark: boolean) => {
		const toggle = document.getElementById('dark-light-toggle')
		if (isDark) {
			if (toggle) toggle.ariaChecked = 'true'
			document.documentElement.classList.add('dark')
			document.documentElement.style.colorScheme = 'dark'
		} else {
			if (toggle) toggle.ariaChecked = 'false'
			document.documentElement.classList.remove('dark')
			document.documentElement.style.colorScheme = 'auto'
		}
	}

	const getPref = () => {
		if (typeof window === 'undefined') return true

		let isDark: boolean
		const storedPref = window.localStorage.getItem('dark-light')
		if (storedPref) {
			isDark = storedPref === 'dark' ? true : false
		} else {
			if (
				window.matchMedia &&
				window.matchMedia('(prefers-color-scheme: dark)').matches
			) {
				isDark = true
			} else {
				isDark = false
			}
		}
		updateBodyClass(isDark)
		return isDark
	}

	const [isDark, setIsDark] = useState(getPref())

	const handleChange = () => {
		const updated = !isDark
		setIsDark(updated)
		window.localStorage.setItem('dark-light', updated ? 'dark' : 'light')
		updateBodyClass(updated)
	}

	return (
		<label
			aria-label="Switch between dark and light mode"
			aria-checked={isDark ? 'true' : 'false'}
			className={`interactive relative h-8 w-8 [&[aria-checked="false"]>svg:first-of-type]:animate-down-new-left [&[aria-checked="false"]>svg:last-of-type]:animate-down-old-left [&[aria-checked="true"]>svg:first-of-type]:animate-down-old-left [&[aria-checked="true"]>svg:last-of-type]:animate-down-new-left ${
				props.className ?? ''
			}`}
			id="dark-light-toggle"
			role="switch"
			style={props.style}
			suppressHydrationWarning={true}
			tabIndex={0}
		>
			<input
				className="hidden"
				onChange={handleChange}
				suppressHydrationWarning={true}
				type="checkbox"
			/>
			<svg
				viewBox="0 0 800 800"
				className="absolute inset-0 opacity-0"
				fill="currentColor"
			>
				<path
					className="origin-center animate-spin"
					style={{ animationDuration: '20s' }}
					d="m402 220 105 30 56 75 22 120-49 71-93 69-91-14-100-50-26-96 27-94 53-83 96-28ZM192 104l-63 57 84 78 56-54-77-81ZM561 67l-70-27-27 114 76 23 21-110ZM767 347l-8-65-114 27 15 69 107-31ZM608 692l68-45-77-86-59 42 68 89ZM219 718l73 30 55-100-92-43-36 113ZM43 391l11 88 100-24 1-70-112 6Z"
				/>
			</svg>
			<svg
				viewBox="0 0 800 800"
				className="absolute inset-0 opacity-0"
				fill="currentColor"
			>
				<path
					className="origin-center animate-wiggle"
					d="m363 114 166 58 76 153 15 159-103 150-193 42-149-52 95-51 72-50 64-119 3-153-46-137Z"
				/>
			</svg>
		</label>
	)
}
