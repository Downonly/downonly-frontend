'use client'

import { OrbitControls } from '@react-three/drei'
import { isDebug } from '@/utils/debug'
import { useControls } from 'leva'

export default function Orbit(): JSX.Element {
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
						value: false,
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
				enablePan: false,
		  }

	return (
		<OrbitControls
			makeDefault
			minDistance={minDistance}
			maxDistance={maxDistance}
			enableZoom={enableZoom}
			enablePan={enablePan}
		/>
	)
}
