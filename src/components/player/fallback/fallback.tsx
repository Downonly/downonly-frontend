import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

export default function Fallback() {
	const cubeRef = useRef<Mesh>(null)

	useFrame(() => {
		if (cubeRef.current) {
			cubeRef.current.rotation.y -= 0.05
			cubeRef.current.rotation.x -= 0.01
		}
	})

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

	return (
		<>
			<mesh scale={1.5} ref={cubeRef}>
				<boxGeometry />
				<meshStandardMaterial color="#191919" wireframe />
			</mesh>
		</>
	)
}
