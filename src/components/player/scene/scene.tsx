'use client'

// import { useFrame } from '@react-three/fiber'
// import { useRef } from 'react'
// import { Mesh } from 'three'
// import { useControls } from 'leva'
import { /*isDebug, */ isPerf } from '@/utils/debug'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function Scene(): JSX.Element {
	// const cubeRef = useRef<Mesh>(null)

	const model = useLoader(
		GLTFLoader,
		// '/QmVHsPUUoxmWvP4yogUf9GnnKXoPMjBVRsipyzLUYEvEPc'
		'/WireframeTestFall_230718.glb'
	)

	// const spherePositionXVal = 2
	// const { spherePositionX } = isDebug()
	// 	? // eslint-disable-next-line react-hooks/rules-of-hooks
	// 	  useControls({
	// 			spherePositionX: {
	// 				value: spherePositionXVal,
	// 				min: -2,
	// 				max: 2,
	// 				step: 0.01,
	// 			},
	// 	  })
	// 	: {
	// 			spherePositionX: spherePositionXVal,
	// 	  }

	// useFrame(() => {
	// 	if (cubeRef.current) {
	// 		cubeRef.current.rotation.y += 0.01
	// 	}
	// })

	return (
		<>
			{isPerf() && <Perf position="top-left" />}
			<OrbitControls makeDefault />

			<ambientLight />
			{/*<pointLight position={[10, 10, 10]} />*/}
			<directionalLight position={[1, 2, 3]} intensity={1.5} />

			<primitive object={model.scene} />

			{/*<mesh ref={cubeRef} position-x={-2} scale={1.5}>*/}
			{/*	<boxGeometry />*/}
			{/*	<meshStandardMaterial color="red" />*/}
			{/*</mesh>*/}
			{/*<mesh position-x={spherePositionX}>*/}
			{/*	<sphereGeometry />*/}
			{/*	<meshStandardMaterial color="orange" />*/}
			{/*</mesh>*/}
			{/*<mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>*/}
			{/*	<planeGeometry />*/}
			{/*	<meshBasicMaterial color="greenyellow" />*/}
			{/*</mesh>*/}
		</>
	)
}
