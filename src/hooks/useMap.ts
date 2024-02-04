import { useState } from 'react'

export const useMap = <K, V>(
	initialValue?: Map<K, V>
): {
	clear: () => void
	has: (key: K) => boolean
	get: (key: K) => V | undefined
	keys: () => IterableIterator<K>
	remove: (key: K) => void
	set: (key: K, value: V) => void
} => {
	const [map, setMap] = useState(new Map<K, V>(initialValue))

	const actions = {
		clear: () => setMap(new Map()),
		has: (key: K) => map.has(key),
		get: (key: K) => map.get(key),
		keys: () => map.keys(),
		remove: (key: K) =>
			setMap((prevMap) => {
				prevMap.delete(key)
				const nextMap = new Map(prevMap)
				return nextMap
			}),
		set: (key: K, value: V) =>
			setMap((prevMap) => {
				const nextMap = new Map(prevMap)
				nextMap.set(key, value)
				return nextMap
			}),
	}

	return actions
}
