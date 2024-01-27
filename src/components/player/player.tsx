'use client'

import MintCTA from '@/components/player/mintCTA/mintCTA'
import Canvas from '@/components/player/canvas/canvas'
import Scene from '@/components/player/scene/scene'
import Model from '@/components/player/model/model'
import { useEffect, useRef, useState } from 'react'
import { type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import Controls from '@/components/player/controls/controls'
import { useMap } from 'usehooks-ts'
import { useGLTF } from '@react-three/drei'

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
	model?: GLTF
	modelURL: string
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
	const ocRef = useRef(null)
	const [loaded, { set: setLoaded }] = useMap<string, GLTF>()
	const [isPreloading, setIsPreloading] = useState(true)
	const [isPlaying, setIsPlaying] = useState(true)
	const [isSounding, setIsSounding] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [takes, setTakes] = useState<Take[]>()

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
		if (takes?.length) {
			useGLTF.preload(
				takes
					.slice(currentIndex, currentIndex + BUFFER_SIZE)
					.map((take) => take.modelURL),
				undefined,
				undefined,
				(loader) => {
					const originalLoad = loader.load.bind(loader)
					loader.load = (
						url: string,
						onLoad: (gltf: GLTF) => void,
						onProgress?:
							| ((event: ProgressEvent<EventTarget>) => void)
							| undefined,
						onError?: ((event: ErrorEvent) => void) | undefined
					) => {
						originalLoad(url, (gltf: GLTF) => {
							setLoaded(url, gltf)
							onLoad(gltf)
						}),
							onProgress,
							onError
					}
				}
			)
		}
	}, [setLoaded, currentIndex, takes])

	useEffect(() => {
		if (!takes?.length) return
		// Set only to preloading, if the current is not preloaded.
		if (!isPreloading && loaded.has(takes[currentIndex].modelURL)) {
			return
		}

		setIsPreloading(
			takes
				.slice(currentIndex + 1, currentIndex + BUFFER_SIZE)
				.some((take) => !loaded.has(take.modelURL))
		)
	}, [currentIndex, isPreloading, takes, loaded])

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
					<Canvas id="canvas" className="aspect-square cursor-grab bg-silver">
						<Scene ocRef={ocRef}>
							{takes?.length && (
								<group>
									<Model
										isPlaying={!isPreloading && isPlaying}
										ocRef={ocRef}
										onFinished={handleFinished}
										audioPath={takes.at(currentIndex)!.soundURL}
										gltf={loaded.get(takes.at(currentIndex)!.modelURL)}
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
