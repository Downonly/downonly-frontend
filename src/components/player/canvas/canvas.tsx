'use client'

import { Canvas as FiberCanvas } from '@react-three/fiber'

export default function Canvas(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	const gl = {
		antialias: false,
		// logarithmicDepthBuffer: true,
		// toneMapping: ACESFilmicToneMapping, // default
		// pixelRatio: Math.min(window.devicePixelRatio, 2),
		pixelRatio: 1,
	}

	return (
		<FiberCanvas
			dpr={[1, 2]}
			id={props.id}
			className={`size-full ${props.className ?? ''}`}
			style={props.style}
			camera={{ fov: 40, near: 0.1, far: 200, position: [1, -1, 9] }}
			gl={gl}
			resize={{ scroll: false }}
		>
			{props.children}
		</FiberCanvas>
	)
}
