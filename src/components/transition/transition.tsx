'use client'

import useViewTransition from '@/hooks/useViewTransition'
import { useEffect, useTransition } from 'react'

export default function Transition() {
	const startViewTransition = useViewTransition()
	const [, startTransition] = useTransition()

	useEffect(() => {
		if (!('startViewTransition' in document)) return
		window.onpopstate = function () {
			startTransition(
				() =>
					void startViewTransition({
						classNames: ['page-transition'],
					})
			)
		}
	}, [startViewTransition])

	return <></>
}
