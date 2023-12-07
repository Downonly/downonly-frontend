import { useAnimations, useGLTF } from '@react-three/drei'
import { Howl } from 'howler'
import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import { LoopOnce, type Object3D } from 'three'
import { OrbitControls as OCs } from 'three/examples/jsm/controls/OrbitControls'

let ticking = false
let sound: Howl
export default function Model(props: {
	audioPath: string
	gltfPath: string
	isPlaying: boolean
	ocRef: MutableRefObject<null>
	onFinished: () => void
}) {
	const { scene, animations } = useGLTF(props.gltfPath)
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
		mixer.time = 0
		action.play()
		action.paused = !props.isPlaying

		if (sound) {
			sound.off('play')
			sound.unload()
		}

		sound = new Howl({
			src: [props.audioPath],
		})
		sound.on('play', () => {
			sound.seek(mixer.time)
			console.info('mixer', mixer)
		})
		if (props.isPlaying) {
			sound.play()
		}
	}, [action, animations, mixer, props.audioPath, props.isPlaying])

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
