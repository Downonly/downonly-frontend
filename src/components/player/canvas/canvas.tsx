'use client'

import { Canvas as FiberCanvas } from '@react-three/fiber'

export default function Canvas(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	const gl = {
		// antialias: false,
		// toneMapping: ACESFilmicToneMapping, // default
		logarithmicDepthBuffer: true,
	}

	return (
		<FiberCanvas
			dpr={[1, 2]}
			id={props.id}
			className={`h-full w-full ${props.className || ''}`}
			style={props.style}
			camera={{ fov: 45, near: 0.1, far: 200, position: [3, 2, 6] }}
			gl={gl}
		>
			{props.children}
		</FiberCanvas>
	)
}
