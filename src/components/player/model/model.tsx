// import { Howl } from 'howler'
import {
	MutableRefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import { AnimationMixer, Clock, LoopOnce, type Object3D } from 'three'
import { OrbitControls as OCs } from 'three/examples/jsm/controls/OrbitControls'
import { type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props: {
	audioPath: string
	gltf?: GLTF
	isPlaying: boolean
	ocRef: MutableRefObject<null>
	onFinished: () => void
}) {
	const raf = useRef<number>()
	const clock = useRef(new Clock(props.isPlaying))
	const oldElapsedTime = useRef(0)
	const mixer = useRef<AnimationMixer | null>(null)
	const ticking = useRef(false)

	const { scene, animations } = props.gltf ?? {}
	const [hip, setHip] = useState<Object3D>()

	const tick = useCallback(() => {
		if (!ticking.current) return
		if (!scene) return
		if (!mixer.current) return

		const elapsedTime = clock.current.getElapsedTime()
		const deltaTime = elapsedTime - oldElapsedTime.current
		oldElapsedTime.current = elapsedTime

		mixer.current.update(deltaTime)

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

		raf.current = window.requestAnimationFrame(tick)
	}, [hip, props.ocRef, scene])

	const play = useCallback(() => {
		if (!mixer.current) return
		if (!animations) return

		const action = mixer.current.clipAction(animations[0])
		if (!action) return

		action.setLoop(LoopOnce, 0)
		mixer.current.time = 0
		action.play()
		action.paused = !props.isPlaying
	}, [animations, props.isPlaying])

	useEffect(() => {
		ticking.current = true
		tick()
		return () => {
			ticking.current = false
		}
	}, [tick])

	useEffect(() => {
		if (props.isPlaying) {
			clock.current.start()
		} else {
			clock.current.stop()
		}
	}, [props.isPlaying])

	useEffect(() => {
		const mx = mixer.current
		mx?.addEventListener('finished', props.onFinished)
		return () => {
			mx?.removeEventListener('finished', props.onFinished)
		}
	}, [props.onFinished])

	useEffect(() => {
		clock.current = new Clock(props.isPlaying)
		oldElapsedTime.current = 0
		mixer.current = scene ? new AnimationMixer(scene) : null
		scene?.traverse((child) => {
			if (child.name.includes('_hip_01')) {
				setHip(child)
			}
		})
		play()
	}, [play, props.isPlaying, scene])

	useEffect(() => {
		const r = raf.current
		return () => {
			if (typeof r === 'number') {
				window.cancelAnimationFrame(r)
			}
		}
	}, [])

	return scene ? <primitive object={scene} /> : <></>
}
