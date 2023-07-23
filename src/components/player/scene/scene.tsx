'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { isDebug, isPerf } from '@/utils/debug'
import { useControls } from 'leva'

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
			<mesh ref={cubeRef} position-x={-2} scale={1.5}>
				<boxGeometry />
				<meshStandardMaterial color="red" />
			</mesh>
			<mesh position-x={spherePositionX}>
				<sphereGeometry />
				<meshStandardMaterial color="orange" />
			</mesh>
			<mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
				<planeGeometry />
				<meshBasicMaterial color="greenyellow" />
			</mesh>
		</>
	)
}
