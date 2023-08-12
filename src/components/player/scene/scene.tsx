'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
import { useControls } from 'leva'
import { isDebug, isPerf } from '@/utils/debug'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import Model from '@/components/player/model/model'
import Fallback from '@/components/player/fallback/fallback'

export default function Scene(): JSX.Element {
	const cubeRef = useRef<Mesh>(null)

	const spherePositionXVal = 2
	const { spherePositionX } = isDebug()
		? // eslint-disable-next-line react-hooks/rules-of-hooks
		  useControls({
				spherePositionX: {
					value: spherePositionXVal,
					min: -2,
					max: 2,
					step: 0.01,
				},
		  })
		: {
				spherePositionX: spherePositionXVal,
		  }

	useFrame(() => {
		if (cubeRef.current) {
			cubeRef.current.rotation.y += 0.01
		}
	})

	return (
		<>
			{isPerf() && <Perf position="top-left" />}
			<OrbitControls makeDefault />

			<ambientLight />
			{/*<pointLight position={[10, 10, 10]} />*/}
			<directionalLight position={[1, 2, 3]} intensity={1.5} />

			<Suspense fallback={<Fallback />}>
				<Model />
			</Suspense>
		</>
	)
}
