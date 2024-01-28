'use client'

import { isPerf } from '@/utils/debug'
import { Perf } from 'r3f-perf'
import { MutableRefObject } from 'react'
import Orbit from './orbit'

export default function Scene(props: {
	children: React.ReactNode
	ocRef: MutableRefObject<null>
}): JSX.Element {
	return (
		<>
			{isPerf() && <Perf position="top-left" />}
			<Orbit ocRef={props.ocRef} />

			<ambientLight />
			{/*<pointLight position={[10, 10, 10]} />*/}
			<directionalLight
				position={[1, 2, 3]}
				intensity={1.5}
				shadow-normalBias={0.04}
			/>

			{props.children}
		</>
	)
}
