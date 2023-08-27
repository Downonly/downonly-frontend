export const isTouchDevice = () =>
	'ontouchstart' in window ||
	navigator.maxTouchPoints > 0 ||
	(navigator as unknown as { msMaxTouchPoints: number }).msMaxTouchPoints > 0
