import { useCallback, useEffect, useRef, useState } from 'react'
import {
	type AnimationAction,
	AnimationMixer,
	Clock,
	LoopOnce,
	type Object3D,
} from 'three'
import { type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props: {
	gltf?: GLTF
	isPlaying: boolean
	isSounding: boolean
	onFinished: () => void
	sound?: Howl
}) {
	const raf = useRef<number>()
	const clockRef = useRef(new Clock())
	const oldElapsedTime = useRef(0)
	const mixerRef = useRef<AnimationMixer | null>(null)
	const soundRef = useRef<Howl | null>(null)
	const isPlayingRef = useRef(props.isPlaying)
	const isSoundingRef = useRef(props.isSounding)
	const actionRef = useRef<AnimationAction>()
	const hipRef = useRef<Object3D>()
	const handleFinishedRef = useRef<() => void>()

	const [tick, setTick] = useState(false)

	const updateOCs = useCallback(() => {
		const { scene } = props.gltf ?? {}

		if (!scene) return
		if (!hipRef.current) return

		scene.position.setX(-hipRef.current.position.x)
		scene.position.setY(-hipRef.current.position.y)
		scene.position.setZ(hipRef.current.position.z)
	}, [props.gltf])

	useEffect(() => {
		isPlayingRef.current = props.isPlaying
	}, [props.isPlaying])

	useEffect(() => {
		isSoundingRef.current = props.isSounding
	}, [props.isSounding])

	useEffect(() => {
		const elapsedTime = clockRef.current?.getElapsedTime() ?? 0
		const deltaTime = elapsedTime - oldElapsedTime.current
		oldElapsedTime.current = elapsedTime

		if (isPlayingRef.current) mixerRef.current?.update(deltaTime)
		updateOCs()

		raf.current = window.requestAnimationFrame(() => {
			setTick(!tick)
		})
	}, [tick, updateOCs])

	useEffect(() => {
		handleFinishedRef.current = props.onFinished
	}, [props.onFinished])

	useEffect(() => {
		const { scene, animations } = props.gltf ?? {}
		const snd = props.sound

		if (!animations) return
		if (!scene) return
		if (!snd) return

		mixerRef.current?.stopAllAction()
		mixerRef.current?.removeEventListener(
			'finished',
			handleFinishedRef.current!
		)
		soundRef.current?.stop()
		soundRef.current?.off('play')

		const mx = new AnimationMixer(scene)
		const ac = mx.clipAction(animations[0])
		mx.addEventListener('finished', handleFinishedRef.current!)
		ac.setLoop(LoopOnce, 0)
		actionRef.current = ac
		mixerRef.current = mx
		snd.on('play', () => {
			snd.seek(mx.time)
		})
		soundRef.current = snd
		if (isSoundingRef.current) snd.play()

		scene?.traverse((child) => {
			if (child.name.includes('_hip_01')) {
				hipRef.current = child
				return false
			}
		})

		ac.play()
	}, [props.sound, props.gltf])

	useEffect(() => {
		if (actionRef.current) {
			actionRef.current.paused = !props.isPlaying
		}

		if (!soundRef.current) return

		if (props.isPlaying) {
			if (!soundRef.current?.playing()) {
				soundRef.current.play()
			}
		} else {
			soundRef.current?.stop()
		}
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
