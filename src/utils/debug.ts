export function isDebug() {
	if (typeof location === 'undefined') return false
	return location.hash.includes('debug')
}

export function isPerf() {
	if (typeof location === 'undefined') return false
	return location.hash.includes('perf')
}
