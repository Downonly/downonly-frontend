'use client'

import Circle from '@/components/circle/circle'
import Arrow from '@/components/arrow/arrow'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Loading from '@/components/loading/loading'

export default function Picker(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
	options: {
		emoji: string
		gif: string
	}[]
}): JSX.Element {
	const { options } = props

	const [currentPick, setCurrentPick] = useState(0)
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		setLoaded(false)
	}, [currentPick])

	return (
		<div
			id={props.id}
			className={`grid h-full place-items-center ${props.className ?? ''}`}
			style={props.style}
		>
			<div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-6 text-2xl">
				{options[currentPick]?.emoji}
			</div>

			<Loading className={`-translate-y-3${loaded ? ' invisible' : ''}`} />
			<Image
				onLoad={() => {
					console.info('onload')
					setLoaded(true)
				}}
				src={options[currentPick]?.gif}
				width={250}
				height={250}
				alt=""
				style={{
					position: 'absolute',
					visibility: loaded ? 'inherit' : 'hidden',
				}}
			/>

			<button
				disabled={options.length <= 1}
				className="interactive absolute left-4 top-1/2 -translate-y-1/2"
				onClick={() =>
					setCurrentPick(
						currentPick === 0 ? options.length - 1 : currentPick - 1
					)
				}
			>
				<Circle
					salt="sugarcane"
					className="rotate-180 scale-75 text-nickel dark:text-snow"
				>
					<Arrow className="text-snow dark:text-carbon">Previous</Arrow>
				</Circle>
			</button>
			<button
				disabled={options.length <= 1}
				className="interactive absolute right-4 top-1/2 -translate-y-1/2"
				onClick={() =>
					setCurrentPick(
						currentPick === options.length - 1 ? 0 : currentPick + 1
					)
				}
			>
				<Circle salt="bean" className="scale-75 text-nickel dark:text-snow">
					<Arrow className="text-snow dark:text-carbon">Next</Arrow>
				</Circle>
			</button>
		</div>
	)
}
