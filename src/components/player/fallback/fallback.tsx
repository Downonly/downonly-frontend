import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
import { Html, useProgress } from '@react-three/drei'

export default function Fallback() {
	const cubeRef = useRef<Mesh>(null)

	const { progress } = useProgress()

	useFrame(() => {
		if (cubeRef.current) {
			cubeRef.current.rotation.y -= 0.05
			cubeRef.current.rotation.x -= 0.01
		}
	})

	return (
		<>
			<mesh scale={1.5} ref={cubeRef}>
				<boxGeometry />
				<meshStandardMaterial color="#191919" wireframe />
			</mesh>
			<Html center>
				<p className="text-display text-xl text-cole">{progress.toFixed(0)}%</p>
			</Html>
		</>
	)
}
