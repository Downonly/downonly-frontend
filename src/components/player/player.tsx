'use client'

import MintCTA from '@/components/player/mintCTA/mintCTA'
import Canvas from '@/components/player/canvas/canvas'
import Scene from '@/components/player/scene/scene'
import Controls from '@/components/player/controls/controls'
import Model from '@/components/player/model/model'
import { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'

interface Row {
	id: string
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

interface Take extends Omit<Row, 'ipfsSound' | 'ipfsVideo' | 'mintdate'> {
	modelURL: string
	soundURL: string
	mintDate: Date
}

export default function Player(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	const ocRef = useRef(null)
	const [isPlaying, setIsPlaying] = useState(true)
	const [isSounding, setIsSounding] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [takes, setTakes] = useState<Take[]>()

	useEffect(() => {
		fetch(`/api/mints`, { cache: 'force-cache' })
			.then((response) => response.json())
			.then((data: Row[]) => {
				console.info('data', data)
				setTakes(
					data
						.filter((row) => row.ipfsVideo && row.ipfsSound)
						.map((row) => {
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
					.slice(currentIndex + 1, currentIndex + 4)
					.map((take) => take.modelURL)
			)
		}
	}, [currentIndex, takes])

	const handleFinished = () => {
		if (!takes) return
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
										isPlaying={isPlaying}
										ocRef={ocRef}
										onFinished={handleFinished}
										audioPath={takes.at(currentIndex)!.soundURL}
										gltfPath={takes.at(currentIndex)!.modelURL}
									/>
								</group>
							)}
						</Scene>
					</Canvas>
				</div>
				<div className="do-fall do-fall-0 absolute right-0 top-0 z-10 h-full">
					<Controls
						className="h-full"
						currentIndex={currentIndex}
						isPlaying={isPlaying}
						isSounding={isSounding}
						onNext={handleNext}
						onPause={handlePause}
						onPlay={handlePlay}
						onPrev={handlePrev}
						onSeek={handleSeek}
						onSound={handleSound}
						total={takes?.length ?? 0}
					/>
				</div>
			</div>
			<div className="do-fall do-fall-3 flex items-center justify-center p-6 text-center">
				<MintCTA />
			</div>
		</section>
	)
}
