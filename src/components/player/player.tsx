'use client'

import MintCTA from '@/components/player/mintCTA/mintCTA'
import Canvas from '@/components/player/canvas/canvas'
import Scene from '@/components/player/scene/scene'
import Model from '@/components/player/model/model'
import { useCallback, useEffect, useRef, useState } from 'react'
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Controls from '@/components/player/controls/controls'
import { useMap } from 'usehooks-ts'
import gsap from 'gsap'
import Loading from '@/components/loading/loading'
import {
	FrontSide,
	LoadingManager,
	Mesh,
	MeshStandardMaterial,
	NearestFilter,
} from 'three'
import { type OrbitControls as OCs } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { Howl } from 'howler'

const loadingManager = new LoadingManager()

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)

export interface Row {
	id: string | number
	jobState: 'paid' | 'minting' | 'done'
	surface: string
	obstacle: string
	figure: string
	ipfsVideo: string | undefined
	openSea: string
	ipfsSound: string | undefined
	fullname: string
	mintdate: string
}

export interface Take
	extends Omit<Row, 'ipfsSound' | 'ipfsVideo' | 'mintdate'> {
	model?: GLTF | null
	modelURL: string
	sound?: Howl | null
	soundURL: string
	mintDate: Date
}

const BUFFER_SIZE = 4

export default function Player(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	const ocRef = useRef<OCs>()
	const [loaded, { set: setLoaded, remove: removeLoaded }] = useMap<
		string,
		{ gltf: GLTF; sound: Howl }
	>()
	const loadedRef = useRef<typeof loaded>()
	const [isPreloading, setIsPreloading] = useState(true)
	const [isPlaying, setIsPlaying] = useState(true)
	const [isSounding, setIsSounding] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [takes, setTakes] = useState<Take[]>()

	const [currentGLTF, setCurrentGLTF] = useState<GLTF>()
	const [currentSound, setCurrentSound] = useState<Howl>()

	useEffect(() => {
		loadedRef.current = loaded
	}, [loaded])

	useEffect(() => {
		setTakes([])

		if (process.env.NEXT_PUBLIC_PLAYER_DISABLED) return

		if (process.env.NEXT_PUBLIC_MOCK_MINTS) {
			import('./mockData')
				.then((module) => {
					setTakes(
						module
							.getMockData()
							.filter((row) => row.ipfsVideo && row.ipfsSound)
							.map<Take>((row) => {
								const { ipfsVideo, ipfsSound, mintdate, ...rest } = row
								return {
									modelURL: ipfsVideo,
									soundURL: ipfsSound,
									mintDate: new Date(mintdate),
									...rest,
								} as Take
							})
					)
				})
				.catch((err) => {
					console.error(err)
				})
			return
		}

		fetch(`/api/mints`, { cache: 'force-cache' })
			.then((response) => response.json())
			.then((data: Row[]) => {
				setTakes(
					data
						.filter((row) => row.ipfsVideo && row.ipfsSound)
						.map<Take>((row) => {
							const { ipfsVideo, ipfsSound, mintdate, ...rest } = row
							return {
								modelURL: ipfsVideo!,
								soundURL: ipfsSound!,
								mintDate: new Date(mintdate),
								...rest,
							}
						})
				)
			})
			.catch((err) => {
				console.error(err)
			})
	}, [])

	useEffect(() => {
		if (!takes?.length) return

		const takesToPreload = takes.slice(currentIndex, currentIndex + BUFFER_SIZE)
		if (takesToPreload.length < BUFFER_SIZE) {
			takesToPreload.push(
				...takes.slice(0, BUFFER_SIZE - takesToPreload.length)
			)
		}
		takesToPreload.forEach((take) => {
			const sound = new Howl({
				src: [take.soundURL],
			})

			gltfLoader.load(take.modelURL, (gltf: GLTF) => {
				gltf.scene.traverse((child) => {
					child.frustumCulled = false
					// Improve performance of textures.
					if (
						child instanceof Mesh &&
						child.material instanceof MeshStandardMaterial
					) {
						child.material.side = FrontSide
						if (child.material.map) {
							child.material.map.generateMipmaps = false
							child.material.map.minFilter = NearestFilter
						}
					}
				})
				if (!loadedRef.current!.has(take.modelURL)) {
					setLoaded(take.modelURL, { gltf, sound })
				}
			})
		})
	}, [setLoaded, currentIndex, takes])

	const getNextTakes = useCallback(() => {
		if (!takes?.length) return []
		const nextTakes = takes.slice(currentIndex + 1, currentIndex + BUFFER_SIZE)
		if (nextTakes.length < BUFFER_SIZE - 1) {
			nextTakes.push(...takes.slice(0, BUFFER_SIZE - 1 - nextTakes.length))
		}
		return nextTakes
	}, [currentIndex, takes])

	useEffect(() => {
		if (!takes?.length) return
		// Set only to preloading, if the current is not preloaded.
		if (!isPreloading && loaded.get(takes[currentIndex].modelURL)) {
			return
		}

		const nextTakes = getNextTakes()

		setIsPreloading(nextTakes.some((take) => !loaded.get(take.modelURL)))
	}, [currentIndex, getNextTakes, isPreloading, loaded, takes])

	useEffect(() => {
		if (!takes?.length) return
		const nextTakes = getNextTakes()

		// Dispose all loaded that are not listed as next.
		Array.from(loaded.keys()).forEach((modelURL) => {
			if (modelURL === takes[currentIndex].modelURL) return
			if (!nextTakes.some((nextTake) => nextTake.modelURL === modelURL)) {
				const scene = loaded.get(modelURL)?.gltf.scene
				scene?.traverse((child) => {
					if (child instanceof Mesh) {
						const mesh = child as Mesh
						mesh.geometry?.dispose()
						if (Array.isArray(mesh.material)) {
							mesh.material.forEach((m) => m.dispose())
						} else {
							mesh.material.dispose()
						}
					}
				})
				scene?.removeFromParent()
				scene?.clear()
				const sound = loaded.get(modelURL)?.sound
				sound?.unload()
				removeLoaded(modelURL)
				takes.find((take) => take.modelURL === modelURL)!.model = null
			}
		})
	}, [currentIndex, getNextTakes, loaded, removeLoaded, takes])

	const handleFinished = () => {
		if (!takes?.length) return
		if (currentIndex === takes.length - 1) {
			setCurrentIndex(0)
		} else {
			setCurrentIndex(currentIndex + 1)
		}
	}

	const handleNext = () => {
		if (!takes) return
		if (currentIndex < takes.length - 1) {
			setCurrentIndex(currentIndex + 1)
			setIsPlaying(true)
		}
	}

	const handlePause = () => {
		setIsPlaying(false)
	}

	const handlePlay = () => {
		setIsPlaying(true)
	}

	const handlePrev = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1)
			setIsPlaying(true)
		}
	}

	const handleSeek = (index: number) => {
		setCurrentIndex(index)
		setIsPlaying(true)
	}

	const handleSound = () => {
		setIsSounding(!isSounding)
	}

	useEffect(() => {
		const volumeObject = { volume: Howler.volume() }
		gsap.to(volumeObject, {
			volume: isSounding ? 1 : 0,
			duration: 0.5,
			overwrite: 'auto',
			onUpdate: () => {
				Howler.volume(volumeObject.volume)
			},
		})
	}, [isSounding])

	useEffect(() => {
		if (takes?.length) {
			const { gltf, sound } = loaded.get(takes[currentIndex]!.modelURL) ?? {}
			if (gltf && gltf !== currentGLTF) {
				setCurrentGLTF(gltf)
				setCurrentSound(sound)
			}
		}
	}, [currentGLTF, currentIndex, loaded, takes])

	return (
		<section
			id={props.id}
			className={`-mt-36 grid w-full justify-end sm:-mt-32 lg:grid-cols-2 ${
				props.className ?? ''
			}`}
			style={props.style}
		>
			<div
				id="full-screen-container"
				className="relative ms-[calc(-1*(50vw-min(35rem,45vw)))] w-screen min-w-device justify-self-end bg-snow pr-12 transition-colors dark:bg-cole sm:pr-8 lg:w-[50vw] lg:max-w-[40rem] lg:pr-0"
			>
				<div className="do-fall do-fall-1 h-full">
					<Loading
						style={isPreloading ? {} : { visibility: 'hidden' }}
						className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-2"
					/>
					<Canvas id="canvas" className="aspect-square cursor-grab bg-silver">
						<Scene ocRef={ocRef}>
							{takes?.length && (
								<group>
									<Model
										gltf={currentGLTF}
										isPlaying={!isPreloading && isPlaying}
										isSounding={isSounding}
										ocRef={ocRef}
										onFinished={handleFinished}
										sound={currentSound}
									/>
								</group>
							)}
						</Scene>
					</Canvas>
				</div>
				<div className="do-fall do-fall-0 absolute right-0 top-0 z-10 h-full">
					<Controls
						bufferSize={BUFFER_SIZE}
						className="h-full"
						currentIndex={currentIndex}
						isPlaying={isPlaying}
						isSounding={isSounding}
						loaded={new Set(loaded.keys())}
						onNext={handleNext}
						onPause={handlePause}
						onPlay={handlePlay}
						onPrev={handlePrev}
						onSeek={handleSeek}
						onSound={handleSound}
						takes={takes}
					/>
				</div>
			</div>
			<div className="do-fall do-fall-3 flex items-center justify-center p-6 text-center">
				<MintCTA />
			</div>
		</section>
	)
}
