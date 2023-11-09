import { useAnimations, useGLTF } from '@react-three/drei'
import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import { LoopOnce, type Object3D } from 'three'
import { OrbitControls as OCs } from 'three/examples/jsm/controls/OrbitControls'

let ticking = false
export default function Model(props: {
	isPlaying: boolean
	ocRef: MutableRefObject<null>
	onFinished: () => void
	path: string
}) {
	const { scene, animations } = useGLTF(props.path)
	const { mixer, actions } = useAnimations(animations, scene)
	const action = actions[0]
	const [hip, setHip] = useState<Object3D>()

	const tick = useCallback(() => {
		if (!ticking) return

		if (hip) {
			scene.position.setY(-hip?.position.y / 2.5)
			;(props.ocRef.current as unknown as OCs).target?.setX(
				hip.position.x / 1.5
			)
			;(props.ocRef.current as unknown as OCs).target?.setY(hip.position.y / 4)
			;(props.ocRef.current as unknown as OCs).target?.setZ(
				hip.position.z / 1.5
			)
			;(props.ocRef.current as unknown as OCs).target?.setX(
				hip.position.x / 1.5
			)
			// .set(
			// 	hip.position.x,
			// 	hip.position.y,
			// 	hip.position.z / 2
			// )
		}

		window.requestAnimationFrame(tick)
	}, [hip, props.ocRef, scene.position])

	useEffect(() => {
		ticking = true
		tick()
		return () => {
			ticking = false
		}
	}, [tick])

	useEffect(() => {
		mixer.addEventListener('finished', props.onFinished)
		return () => {
			mixer.removeEventListener('finished', props.onFinished)
		}
	}, [mixer, props.onFinished])

	useEffect(() => {
		const action = mixer.clipAction(animations[0])
		action.setLoop(LoopOnce, 0)
		action.play()
		action.paused = !props.isPlaying
	}, [action, animations, mixer, props.isPlaying])

	useEffect(() => {
		scene.traverse((child) => {
			child.frustumCulled = false
			if (child.name.includes('_hip_01')) {
				setHip(child)
			}
		})
	}, [scene])

	return <primitive object={scene} />
}
