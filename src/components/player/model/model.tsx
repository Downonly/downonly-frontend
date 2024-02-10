// import { Howl } from 'howler'
import { type MutableRefObject, useEffect, useRef, useState } from 'react'
import {
	type AnimationAction,
	AnimationMixer,
	Clock,
	LoopOnce,
	type Object3D,
} from 'three'
import { type OrbitControls as OCs } from 'three/examples/jsm/controls/OrbitControls'
import { type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props: {
	audioPath: string
	gltf?: GLTF
	isPlaying: boolean
	ocRef: MutableRefObject<OCs | undefined>
	onFinished: () => void
}) {
	const raf = useRef<number>()
	const clock = useRef(new Clock())
	const oldElapsedTime = useRef(0)
	const mixer = useRef<AnimationMixer | null>(null)
	const action = useRef<AnimationAction>()
	const hip = useRef<Object3D>()

	const [tick, setTick] = useState(false)

	useEffect(() => {
		const elapsedTime = clock.current?.getElapsedTime() ?? 0
		const deltaTime = elapsedTime - oldElapsedTime.current
		oldElapsedTime.current = elapsedTime

		mixer.current?.update(deltaTime)

		raf.current = window.requestAnimationFrame(() => {
			setTick(!tick)
		})
	}, [tick])

	// useEffect(() => {
	// 	const { scene } = props.gltf ?? {}
	//
	// 	if (!scene) return
	// 	if (!hip.current) return
	//
	// 	const oc = props.ocRef.current?.target
	// 	if (!oc) return
	//
	// 	console.info('orbit')
	//
	// 	scene.position.setY(-hip.current.position.y / 2.5)
	// 	// oc.setX(hip.current.position.x / 1.5)
	// 	// oc.setY(hip.current.position.y / 4)
	// 	// oc.setZ(hip.current.position.z / 1.5)
	// 	// oc.setX(hip.current.position.x / 1.5)
	// 	oc.set(
	// 		hip.current.position.x,
	// 		hip.current.position.y,
	// 		hip.current.position.z / 2
	// 	)
	// }, [props.gltf, props.ocRef])

	// useEffect(() => {
	// 	if (props.isPlaying) {
	// 		clock.current.start()
	// 	} else {
	// 		clock.current.stop()
	// 	}
	// }, [props.isPlaying])

	useEffect(() => {
		const mx = mixer.current
		return () => {
			if (mx) {
				mx.stopAllAction()
				mx.removeEventListener('finished', props.onFinished)
			}
		}
	}, [props.onFinished])

	useEffect(() => {
		const { scene, animations } = props.gltf ?? {}
		if (!animations || !scene) return

		mixer.current?.stopAllAction()
		mixer.current?.removeEventListener('finished', props.onFinished)

		mixer.current = new AnimationMixer(scene)
		action.current = mixer.current.clipAction(animations[0]!)
		mixer.current.addEventListener('finished', props.onFinished)
		mixer.current.time = 0
		action.current.setLoop(LoopOnce, 0)

		// scene?.traverse((child) => {
		// 	if (child.name.includes('_hip_01')) {
		// 		hip.current = child
		// 		return false
		// 	}
		// })

		action.current.play()
	}, [props.gltf, props.onFinished])

	useEffect(() => {
		if (!action.current) return
		action.current.paused = !props.isPlaying
	}, [props.isPlaying])

	useEffect(() => {
		const r = raf.current
		return () => {
			if (r !== undefined) {
				window.cancelAnimationFrame(r)
			}
		}
	}, [])

	return props.gltf?.scene ? <primitive object={props.gltf.scene} /> : <></>
}
