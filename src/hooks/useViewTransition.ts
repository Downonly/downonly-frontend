let timeout: number
export default function useViewTransition() {
	const bodyStyles = window.getComputedStyle(document.body)
	const transitionDuration = parseFloat(
		bodyStyles.getPropertyValue('--do-view-transition-duration-ms')
	)

	return () => {
		return new Promise<void>((resolve) => {
			document.documentElement.classList.add('page-transition')

			window.clearTimeout(timeout)
			timeout = window.setTimeout(() => {
				resolve()
				document.documentElement.classList.remove('page-transition')
			}, transitionDuration)
		})
	}
}
