'use client'

import { MutableRefObject } from 'react'
import { type OrbitControls as OCs } from 'three/examples/jsm/controls/OrbitControls'
import Orbit from './orbit'

export default function Scene(props: {
	children: React.ReactNode
	ocRef: MutableRefObject<OCs | undefined>
}): JSX.Element {
	return (
		<>
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
