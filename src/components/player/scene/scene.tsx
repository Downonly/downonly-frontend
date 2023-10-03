'use client'

import { isPerf } from '@/utils/debug'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import Fallback from '@/components/player/fallback/fallback'
import Orbit from './orbit'

export default function Scene(props: {
	children: React.ReactNode
}): JSX.Element {
	return (
		<>
			{isPerf() && <Perf position="top-left" />}
			<Orbit />

			<ambientLight />
			{/*<pointLight position={[10, 10, 10]} />*/}
			<directionalLight
				position={[1, 2, 3]}
				intensity={1.5}
				shadow-normalBias={0.04}
			/>

			<Suspense fallback={<Fallback />}>{props.children}</Suspense>
		</>
	)
}
