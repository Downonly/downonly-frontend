import { useEffect, useRef } from 'react'

export function useChanged<T>(
	prop: T,
	callback: (prevProp: T | undefined) => void
): void {
	const prevPropRef = useRef<T | undefined>(undefined)

	useEffect(() => {
		if (prevPropRef.current !== undefined && prevPropRef.current !== prop) {
			callback(prevPropRef.current)
		}
		prevPropRef.current = prop
	}, [prop, callback])
}
