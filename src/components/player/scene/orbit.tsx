'use client'

import type { OrbitControls as OCs } from 'three/examples/jsm/controls/OrbitControls'
import { OrbitControls } from '@react-three/drei'
import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import gsap from 'gsap'
import { useControls } from 'leva'
import { isDebug } from '@/utils/debug'

const INITIAL_DISTANCE = 7
const MAX_DISTANCE = 20
const MIN_DISTANCE = 3

export default function Orbit(props: {
	ocRef: MutableRefObject<null>
}): JSX.Element {
	const onOrbitChange = (isOrbiting: boolean) => {
		const canvas = document.getElementById('canvas')
		if (!canvas) return
		canvas.style.cursor = isOrbiting ? 'grabbing' : 'grab'
	}

	const [isFullScreen, setIsFullScreen] = useState(false)

	const { minDistance, maxDistance, enableZoom, enablePan } = isDebug()
		? // eslint-disable-next-line react-hooks/rules-of-hooks
			useControls(
				'Orbit Controls',
				{
					minDistance: {
						value: MIN_DISTANCE,
						min: 0,
						max: 50,
						step: 0.01,
					},
					maxDistance: {
						value: MAX_DISTANCE,
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
				minDistance: MIN_DISTANCE,
				maxDistance: MAX_DISTANCE,
				enableZoom: false,
				enablePan: false,
			}

	const onFullScreenChange = useCallback(() => {
		const isFS = document.fullscreenElement !== null
		setIsFullScreen(isFS)
		if (!isFS) {
			const orbitControls = props.ocRef.current as unknown as OCs
			;(orbitControls.maxDistance = orbitControls.getDistance()),
				(orbitControls.minDistance = orbitControls.getDistance()),
				gsap.to(orbitControls, {
					minDistance: INITIAL_DISTANCE,
					maxDistance: INITIAL_DISTANCE,
					duration: 0.5,
					overwrite: 'auto',
					ease: 'power1.inOut',
					onComplete: () => {
						orbitControls.minDistance = MIN_DISTANCE
						orbitControls.maxDistance = MAX_DISTANCE
					},
				})
		}
	}, [props.ocRef])

	useEffect(() => {
		const fullscreenContainer = document.getElementById('full-screen-container')
		fullscreenContainer?.addEventListener(
			'fullscreenchange',
			onFullScreenChange
		)
		return () => {
			document
				.getElementById('full-screen-container')
				?.removeEventListener('fullscreenchange', onFullScreenChange)
		}
	}, [onFullScreenChange])

	return (
		<OrbitControls
			ref={props.ocRef}
			enableZoom={isFullScreen || enableZoom}
			enablePan={enablePan}
			makeDefault
			maxDistance={maxDistance}
			minDistance={minDistance}
			onEnd={() => onOrbitChange(false)}
			onStart={() => onOrbitChange(true)}
		/>
	)
}
