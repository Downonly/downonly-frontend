export const formatDuration = (seconds: number): string => {
	const days = Math.floor(seconds / (24 * 3600))
	seconds %= 24 * 3600
	const hours = Math.floor(seconds / 3600)
	seconds %= 3600
	const minutes = Math.floor(seconds / 60)
	seconds %= 60

	return days > 0
		? `${days} d ${hours} h ${minutes} min ${seconds.toString().padStart(2, '0')} s`
		: hours > 0
			? `${hours} h ${minutes} min ${seconds.toString().padStart(2, '0')} s`
			: minutes > 0
				? `${minutes} min ${seconds.toString().padStart(2, '0')} s`
				: seconds > 0
					? `${seconds.toString().padStart(2, '0')} s`
					: '...'
}
