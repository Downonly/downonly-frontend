export function isDebug() {
	return location.hash.includes('debug')
}

export function isPerf() {
	return location.hash.includes('perf')
}
