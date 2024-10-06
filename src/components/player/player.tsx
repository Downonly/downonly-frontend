'use client'

import MintCTA from '@/components/player/mintCTA/mintCTA'
import Canvas from '@/components/player/canvas/canvas'
import Scene from '@/components/player/scene/scene'
import Model from '@/components/player/model/model'
import { useEffect, useMemo, useRef, useState } from 'react'
import { type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import Controls from '@/components/player/controls/controls'
import gsap from 'gsap'
import Loading from '@/components/loading/loading'
import { type OrbitControls as OCs } from 'three/examples/jsm/controls/OrbitControls'
import { Howl } from 'howler'
import { useTakes } from '@/components/player/hooks/useTakes'
import { usePreloading } from '@/components/player/hooks/usePreloading'
import { useNextTakes } from '@/components/player/hooks/useNextTakes'
import { useLoaded } from '@/components/player/hooks/useLoaded'

const BUFFER_SIZE = 4

export default function Player(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): JSX.Element {
	const ocRef = useRef<OCs>()
	const [isPlaying, setIsPlaying] = useState(true)
	const [isSounding, setIsSounding] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)

	const takes = useTakes()
	const getNextTakes = useNextTakes(currentIndex, takes, BUFFER_SIZE)

	const [currentGLTF, setCurrentGLTF] = useState<GLTF>()
	const [currentSound, setCurrentSound] = useState<Howl>()

	const loaded = useLoaded(currentIndex, takes, getNextTakes, BUFFER_SIZE)
	const isPreloading = usePreloading(currentIndex, takes, loaded, getNextTakes)

	const distanceToDeath = useMemo(() => {
		const totalDistance = 33
		return (
			takes?.reduce((acc, current) => {
				return acc - (Number(current.mintprice) ?? 0)
			}, totalDistance) ?? totalDistance
		)
	}, [takes])

	console.info('distanceToDeath', distanceToDeath)

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
			const { gltf, sound } = loaded.get(takes[currentIndex].modelURL) ?? {}
			if (gltf && gltf !== currentGLTF) {
				setCurrentGLTF(gltf)
				setCurrentSound(sound)
			}
		}
	}, [currentGLTF, currentIndex, loaded, takes])

	return (
		<section
			id={props.id}
			className={`-mt-36 grid w-full sm:-mt-32 lg:grid-cols-2 ${
				props.className ?? ''
			}`}
			style={props.style}
		>
			<div
				id="full-screen-container"
				className="relative ms-[calc(-1*(50vw-min(35rem,45vw)))] flex w-screen flex-col justify-self-end bg-snow transition-colors dark:bg-cole lg:w-[50vw] lg:max-w-[40rem]"
			>
				<div className="do-fall do-fall-1 h-full">
					<Loading
						style={isPreloading ? {} : { visibility: 'hidden' }}
						className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-2"
					/>
					<Canvas
						id="canvas"
						className="aspect-4/3 cursor-grab bg-silver sm:aspect-video lg:aspect-square"
					>
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
				<div className="do-fall do-fall-0">
					<Controls
						bufferSize={BUFFER_SIZE}
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
				<MintCTA currentTake={takes?.[currentIndex]} />
			</div>
		</section>
	)
}
