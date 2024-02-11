// import { Howl } from 'howler'
import {
	type MutableRefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
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
	const handleFinished = useRef<() => void>()

	const [tick, setTick] = useState(false)

	const updateOCs = useCallback(() => {
		const { scene } = props.gltf ?? {}
		const oc = props.ocRef.current?.target

		if (!scene) return
		if (!hip.current) return
		if (!oc) return

		scene.position.setY(-hip.current.position.y / 2.5)
		// oc.setX(hip.current.position.x / 1.5)
		// oc.setY(hip.current.position.y / 4)
		// oc.setZ(hip.current.position.z / 1.5)
		// oc.setX(hip.current.position.x / 1.5)
		oc.set(
			hip.current.position.x,
			hip.current.position.y,
			hip.current.position.z / 2
		)
	}, [props.gltf, props.ocRef])

	useEffect(() => {
		const elapsedTime = clock.current?.getElapsedTime() ?? 0
		const deltaTime = elapsedTime - oldElapsedTime.current
		oldElapsedTime.current = elapsedTime

		mixer.current?.update(deltaTime)
		updateOCs()

		raf.current = window.requestAnimationFrame(() => {
			setTick(!tick)
		})
	}, [tick, updateOCs])

	useEffect(() => {
		handleFinished.current = props.onFinished
	}, [props.onFinished])

	useEffect(() => {
		const { scene, animations } = props.gltf ?? {}
		if (!animations) return
		if (!scene) return

		mixer.current?.stopAllAction()
		mixer.current?.removeEventListener('finished', handleFinished.current!)

		const mx = new AnimationMixer(scene)
		const ac = mx.clipAction(animations[0])
		mx.addEventListener('finished', handleFinished.current!)
		ac.setLoop(LoopOnce, 0)
		action.current = ac
		mixer.current = mx

		scene?.traverse((child) => {
			if (child.name.includes('_hip_01')) {
				hip.current = child
				return false
			}
		})

		ac.play()
	}, [props.gltf])

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
