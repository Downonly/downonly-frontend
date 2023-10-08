'use client'

import { OrbitControls } from '@react-three/drei'
import { isDebug } from '@/utils/debug'
import { useControls } from 'leva'

export default function Orbit(): JSX.Element {
	const onOrbitChange = (isOrbiting: boolean) => {
		const canvas = document.getElementById('canvas')
		if (!canvas) return
		canvas.style.cursor = isOrbiting ? 'grabbing' : 'grab'
	}

	const minDistanceVal = 0
	const maxDistanceVal = 20
	const { minDistance, maxDistance, enableZoom, enablePan } = isDebug()
		? // eslint-disable-next-line react-hooks/rules-of-hooks
		  useControls(
				'Orbit Controls',
				{
					minDistance: {
						value: minDistanceVal,
						min: 0,
						max: 5,
						step: 0.01,
					},
					maxDistance: {
						value: maxDistanceVal,
						min: 0,
						max: 50,
						step: 0.01,
					},
					enableZoom: {
						value: false,
					},
					enablePan: {
						value: true,
					},
				},
				{
					collapsed: true,
				}
		  )
		: {
				minDistance: minDistanceVal,
				maxDistance: maxDistanceVal,
				enableZoom: false,
				enablePan: true,
		  }

	return (
		<OrbitControls
			enableZoom={enableZoom}
			enablePan={enablePan}
			makeDefault
			maxDistance={maxDistance}
			minDistance={minDistance}
			onEnd={() => onOrbitChange(false)}
			onStart={() => onOrbitChange(true)}
		/>
	)
}
