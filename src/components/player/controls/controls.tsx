'use client'

import { useEffect, useRef, useState } from 'react'
import { isTouchDevice } from '@/utils/device'
import Progress from './progress'

let timeoutToHide: NodeJS.Timeout

export default function Controls(props: {
	className?: string
	currentIndex: number
	id?: string
	isPlaying: boolean
	isSounding: boolean
	onNext: () => void
	onPause: () => void
	onPlay: () => void
	onPrev: () => void
	onSeek: (index: number) => void
	onSound: () => void
	style?: React.CSSProperties
	total: number
}): JSX.Element {
	const controlsRef = useRef<HTMLDivElement>(null)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const [mouseOverControls, setMouseOverControls] = useState(false)
	const [controlsHidden, setControlsHidden] = useState(false)
	const [canFullscreen, setCanFullscreen] = useState(false)

	const onFullScreenChange = () => {
		setIsFullScreen(document.fullscreenElement !== null)
	}

	const onMouseMove = (ev: MouseEvent) => {
		setMouseOverControls(
			!(
				ev.clientX <
				window.innerWidth - (controlsRef.current?.clientWidth ?? 0)
			)
		)
	}

	const hideAfterTimeout = () => {
		clearTimeout(timeoutToHide)
		timeoutToHide = setTimeout(() => {
			setControlsHidden(true)
		}, 2000)
	}

	useEffect(() => {
		const fullscreenContainer = document.getElementById('full-screen-container')
		if (isFullScreen) {
			fullscreenContainer!.style.paddingRight = '0'
		} else {
			fullscreenContainer!.style.removeProperty('padding-right')
		}

		if (isTouchDevice()) return

		if (isFullScreen) {
			window[isFullScreen ? 'addEventListener' : 'removeEventListener'](
				'mousemove',
				onMouseMove as (ev: Event) => void
			)
			hideAfterTimeout()
		} else {
			clearTimeout(timeoutToHide)
			setControlsHidden(false)
		}
	}, [isFullScreen, props])

	useEffect(() => {
		if (isTouchDevice()) return
		if (!isFullScreen) return

		if (mouseOverControls) {
			clearTimeout(timeoutToHide)
			setControlsHidden(false)
		} else {
			hideAfterTimeout()
		}
	}, [mouseOverControls, isFullScreen])

	useEffect(() => {
		const fullscreenContainer = document.getElementById('full-screen-container')
		fullscreenContainer?.addEventListener(
			'fullscreenchange',
			onFullScreenChange
		)

		if (fullscreenContainer) {
			setCanFullscreen('requestFullscreen' in fullscreenContainer)
		}
		return () => {
			document
				.getElementById('full-screen-container')
				?.removeEventListener('fullscreenchange', onFullScreenChange)
		}
	}, [])

	const toggleFullScreen = () => {
		const elem = document.getElementById('full-screen-container')

		if (!document.fullscreenElement) {
			elem?.requestFullscreen().catch((err) => {
				console.error(err)
			})
		} else {
			void document.exitFullscreen()
		}
	}

	return (
		<div
			id={props.id}
			className={`${props.className ?? ''} ${
				isFullScreen
					? 'absolute right-0 my-auto h-full origin-bottom-left bg-snow/75 p-3 transition-transform duration-300 ease-in-out dark:bg-cole/75 lg:mx-auto lg:me-auto 2xl:mx-auto'
					: 'sm:translate-x-[calc(100%_-_1.5rem)] lg:translate-x-[calc(100%_+_1rem)]'
			}${controlsHidden ? ' translate-x-full rotate-6' : ''} flex`}
			ref={controlsRef}
			style={props.style}
		>
			<Progress
				currentIndex={props.currentIndex}
				onSeek={props.onSeek}
				total={props.total}
			/>

			<div className="ml-3 flex flex-col justify-end gap-2 lg:ml-4">
				<button
					className="interactive"
					disabled={props.currentIndex === 0}
					onClick={props.onPrev}
				>
					<svg
						className="rotate-90"
						width="24"
						height="24"
						viewBox="0 0 800 800"
						fill="currentColor"
					>
						<path d="m717 12-16.4-1.8L158.4 400l-18-387-54.2-3L83 787h57.3l17-356L698 785.7l15.8-2.7L717 12Z" />
					</svg>
				</button>

				<button
					className="interactive"
					onClick={props.isPlaying ? props.onPause : props.onPlay}
				>
					<svg
						className={props.isPlaying ? '' : 'rotate-90'}
						width="24"
						height="24"
						viewBox="0 0 800 800"
						fill="currentColor"
					>
						{props.isPlaying ? (
							<path d="m221.7 749 137.1 8-29.2-728.7L214 29l7.8 720Zm221.6 8H586L539.7 37.3l-122.6-9L443.3 757Z" />
						) : (
							<path d="m141.1 755 23.4 13.8L678.7 400l-7-49L150.2 18.3 121.3 27 141 755Z" />
						)}
					</svg>
				</button>

				<button
					className="interactive"
					disabled={props.currentIndex === props.total - 1}
					onClick={props.onNext}
				>
					<svg
						className="rotate-90"
						width="24"
						height="24"
						viewBox="0 0 800 800"
						fill="currentColor"
					>
						<path d="m92 778 19.4 2.8L644.6 409l15 375 56.2-4L707 10h-56.3l-8 341L102 11.3 80.2 26 92 778Z" />
					</svg>
				</button>

				<button className="interactive" onClick={props.onSound}>
					<svg width="24" height="24" viewBox="0 0 800 800" fill="currentColor">
						<path
							d="M14 1 12.7.9l-6 5.8-3.9-.3-.1 10.3 3.8-.4 6.6 7.1.9-.2v-22Z"
							transform="matrix(33.3 0 0 33.3 -26.4 -2.5)"
						/>
						{props.isSounding ? (
							<path
								d="m642 145-57.4 13.2 66.7 119 24 188.7L587 578.7l48.8 25.3 101.7-102.3-17.7-224.1L642 145Zm-72.8 68.5-49 32.6 43.2 66.4 3 119.7-51.7 71.1 42.4 41.2 79.1-88.5-14.7-131.4-52.3-111.1Z"
								transform="matrix(1.3 0 0 1.1 -166.6 -36.5)"
							/>
						) : (
							<path
								d="m762 326-45.4-45-57.3 71.6L557 257.3l-24.5 64.5 83.7 88.3L526 518.8l41.8 45.2 66.7-82.8 75.2 88.1 34-47-68-88L762 326Z"
								transform="matrix(1.3 0 0 1.2 -219.5 -95)"
							/>
						)}
					</svg>
				</button>

				{canFullscreen && (
					<button className="interactive ms-auto" onClick={toggleFullScreen}>
						<svg
							width="24"
							height="24"
							viewBox="0 0 800 800"
							fill="currentColor"
						>
							<path d="M37.4 430.7h64.1l-2.2 277.2 227.4-.1.6 60.5-288.7-1.6-1.2-336Zm658.6-10 66.8-1-6.4 347.6-335.6 2 2.4-63.5 266.6 1.2 6.2-286.3ZM38.4 350.3l57.1 1-1.2-257.2 232.4-1.9.6-60.5-290.7 1.6 1.8 317Zm660.6-21 60.8 1 3.6-295.6-348.6-3 4.4 58.5L697.8 93l1.2 236.3Z" />
						</svg>
					</button>
				)}
			</div>
		</div>
	)
}
