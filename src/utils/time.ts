export const formatDuration = (seconds: number): string => {
	const days = Math.floor(seconds / (24 * 3600))
	seconds %= 24 * 3600
	const hours = Math.floor(seconds / 3600)
	seconds %= 3600
	const minutes = Math.floor(seconds / 60)
	seconds %= 60

	return days > 0
		? `${days}D ${hours}H ${minutes}M ${seconds.toString().padStart(2, '0')}S`
		: hours > 0
			? `${hours}H ${minutes}M ${seconds.toString().padStart(2, '0')}S`
			: minutes > 0
				? `${minutes}M ${seconds.toString().padStart(2, '0')}S`
				: seconds > 0
					? `${seconds.toString().padStart(2, '0')}S`
					: '...'
}
