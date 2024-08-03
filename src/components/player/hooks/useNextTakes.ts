import { useCallback } from 'react'
import { Take } from '@/components/player/types'

export const useNextTakes = (
	currentIndex: number,
	takes: Take[] | undefined,
	bufferSize: number
) => {
	const getNextTakes = useCallback(() => {
		if (!takes?.length) return []
		const nextTakes = takes.slice(currentIndex + 1, currentIndex + bufferSize)
		if (nextTakes.length < bufferSize - 1) {
			nextTakes.push(...takes.slice(0, bufferSize - 1 - nextTakes.length))
		}
		return nextTakes
	}, [bufferSize, currentIndex, takes])

	return getNextTakes
}
