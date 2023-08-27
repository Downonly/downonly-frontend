'use client'

import { useEffect, useRef, useState } from 'react'
import { isTouchDevice } from '@/utils/device'
import Progress from './progress'

let timeoutToHide: number

export default function Controls(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	const controlsRef = useRef<HTMLDivElement>(null)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const [mouseAtBottom, setMouseAtBottom] = useState(false)
	const [controlsHidden, setControlsHidden] = useState(false)

	const onFullScreenChange = () => {
		setIsFullScreen(document.fullscreenElement !== null)
	}

	const onMouseMove = (ev: MouseEvent) => {
		setMouseAtBottom(
			!(
				ev.clientY <
				window.innerHeight - (controlsRef.current?.clientHeight ?? 0)
			)
		)
	}

	const hideAfterTimeout = () => {
		window.clearTimeout(timeoutToHide)
		timeoutToHide = window.setTimeout(() => {
			setControlsHidden(true)
		}, 2000)
	}

	useEffect(() => {
		if (isTouchDevice()) return

		if (isFullScreen) {
			window[isFullScreen ? 'addEventListener' : 'removeEventListener'](
				'mousemove',
				onMouseMove as (ev: Event) => void
			)
			hideAfterTimeout()
		} else {
			window.clearTimeout(timeoutToHide)
			setControlsHidden(false)
		}
	}, [isFullScreen])

	useEffect(() => {
		if (isTouchDevice()) return
		if (!isFullScreen) return

		if (mouseAtBottom) {
			window.clearTimeout(timeoutToHide)
			setControlsHidden(false)
		} else {
			hideAfterTimeout()
		}
	}, [mouseAtBottom, isFullScreen])

	useEffect(() => {
		document
			.getElementById('full-screen-container')
			?.addEventListener('fullscreenchange', onFullScreenChange)
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
					? 'absolute bottom-0 mx-auto w-full origin-top-left bg-snow/75 p-3 transition-transform duration-300 ease-in-out dark:bg-cole/75 lg:mx-auto lg:me-auto 2xl:mx-auto'
					: 'my-4'
			}${controlsHidden ? ' translate-y-full rotate-6' : ''}`}
			ref={controlsRef}
			style={props.style}
		>
			<Progress className="mb-3" progress={0.3} />

			<div className="flex gap-2">
				<button className="interactive">
					<svg width="24" height="24" viewBox="0 0 800 800" fill="currentColor">
						<path d="m717 12-16.4-1.8L158.4 400l-18-387-54.2-3L83 787h57.3l17-356L698 785.7l15.8-2.7L717 12Z" />
					</svg>
				</button>

				<button className="interactive">
					<svg width="24" height="24" viewBox="0 0 800 800" fill="currentColor">
						<path d="m221.7 749 137.1 8-29.2-728.7L214 29l7.8 720Zm221.6 8H586L539.7 37.3l-122.6-9L443.3 757Z" />
					</svg>
				</button>

				<button className="interactive">
					<svg width="24" height="24" viewBox="0 0 800 800" fill="currentColor">
						<path d="m141.1 755 23.4 13.8L678.7 400l-7-49L150.2 18.3 121.3 27 141 755Z" />
					</svg>
				</button>

				<button className="interactive">
					<svg width="24" height="24" viewBox="0 0 800 800" fill="currentColor">
						<path d="m92 778 19.4 2.8L644.6 409l15 375 56.2-4L707 10h-56.3l-8 341L102 11.3 80.2 26 92 778Z" />
					</svg>
				</button>

				<button className="interactive ms-auto" onClick={toggleFullScreen}>
					<svg width="24" height="24" viewBox="0 0 800 800" fill="currentColor">
						<path d="M37.4 430.7h64.1l-2.2 277.2 227.4-.1.6 60.5-288.7-1.6-1.2-336Zm658.6-10 66.8-1-6.4 347.6-335.6 2 2.4-63.5 266.6 1.2 6.2-286.3ZM38.4 350.3l57.1 1-1.2-257.2 232.4-1.9.6-60.5-290.7 1.6 1.8 317Zm660.6-21 60.8 1 3.6-295.6-348.6-3 4.4 58.5L697.8 93l1.2 236.3Z" />
					</svg>
				</button>
			</div>
		</div>
	)
}
