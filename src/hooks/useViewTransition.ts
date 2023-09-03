import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

let timeout: NodeJS.Timeout
export default function useViewTransition() {
	const pathname = usePathname()

	useEffect(() => {
		document.documentElement.classList.remove('page-transition')
	}, [pathname])

	return () => {
		const bodyStyles = window.getComputedStyle(document.body)
		const transitionDuration = parseFloat(
			bodyStyles.getPropertyValue('--do-view-transition-duration-ms')
		)

		return new Promise<void>((resolve) => {
			document.documentElement.classList.add('page-transition')

			clearTimeout(timeout)
			timeout = setTimeout(() => {
				resolve()
			}, transitionDuration)
		})
	}
}
