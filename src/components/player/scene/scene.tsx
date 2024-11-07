'use client'

import { isPerf } from '@/utils/debug'
import { Perf } from 'r3f-perf'
import { MutableRefObject } from 'react'
import { type OrbitControls as OCs } from 'three/examples/jsm/controls/OrbitControls'
import Orbit from './orbit'

export default function Scene(props: {
	children: React.ReactNode
	ocRef: MutableRefObject<OCs | undefined>
}): JSX.Element {
	return (
		<>
			{isPerf() && <Perf position="top-left" />}
			<Orbit ocRef={props.ocRef as unknown as MutableRefObject<null>} />

			<ambientLight />
			<directionalLight
				position={[1, 2, 3]}
				intensity={1.5}
				shadow-normalBias={0.04}
			/>

			{props.children}
		</>
	)
}
