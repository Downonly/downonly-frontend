'use client'

import MintCTA from '@/components/player/mintCTA/mintCTA'
import Canvas from '@/components/player/canvas/canvas'
import Scene from '@/components/player/scene/scene'
import Controls from '@/components/player/controls/controls'
import Model from '@/components/player/model/model'
import { useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Player(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	const [isPlaying, setIsPlaying] = useState(true)
	const [isSounding, setIsSounding] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)

	const [modelsToLoad] = useState(['/WireframeTestFall_230718.glb'])
	// const [modelsToLoad] = useState([
	// 	'/bf_toWeb_Exports/bf06/bf06.draco.glb',
	// 	'/bf_toWeb_Exports/bf07/bf07.draco.glb',
	// 	'/bf_toWeb_Exports/bf08/bf08.draco.glb',
	// 	'/bf_toWeb_Exports/bf09/bf09.draco.glb',
	// ])

	useEffect(() => {
		if (modelsToLoad.length) {
			useGLTF.preload(modelsToLoad.slice(currentIndex + 1, currentIndex + 4))
		}
	}, [currentIndex, modelsToLoad])

	const handleFinished = () => {
		if (currentIndex === modelsToLoad.length - 1) {
			setCurrentIndex(0)
		} else {
			setCurrentIndex(currentIndex + 1)
		}
	}

	const handleNext = () => {
		if (currentIndex < modelsToLoad.length - 1) {
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
		<>
			<div
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
							<Scene>
								{modelsToLoad.length && (
									<group>
										<Model
											isPlaying={isPlaying}
											onFinished={handleFinished}
											path={modelsToLoad.at(currentIndex)!}
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
							total={modelsToLoad.length}
						/>
					</div>
				</div>
				<div className="do-fall do-fall-3 flex items-center justify-center p-6 text-center">
					<MintCTA />
				</div>
			</div>
		</>
	)
}
