import { type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { useEffect, useState } from 'react'
import { Take } from '@/components/player/types'

export const usePreloading = (
	currentIndex: number,
	takes: Take[] | undefined,
	loaded: Omit<
		Map<string, { gltf: GLTF; sound: Howl }>,
		'set' | 'clear' | 'delete'
	>,
	getNextTakes: () => Take[]
) => {
	const [isPreloading, setIsPreloading] = useState(true)

	useEffect(() => {
		if (!takes?.length) return
		// Set only to preloading, if the current is not preloaded.
		if (!isPreloading && loaded.get(takes[currentIndex].modelURL)) {
			return
		}

		const nextTakes = getNextTakes()

		setIsPreloading(nextTakes.some((take) => !loaded.get(take.modelURL)))
	}, [currentIndex, getNextTakes, isPreloading, loaded, takes])

	return Boolean(takes && !takes.length) ? false : isPreloading
}
