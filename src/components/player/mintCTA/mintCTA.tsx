'use client'

import { useEffect } from 'react'
import { getPrice } from '@/services/ether'

export default function MintCTA(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	useEffect(() => {
		;(async () => {
			console.info('dadadada', await getPrice())
		})()
	}, [])

	return (
		<div
			id={props.id}
			className={`${props.className || ''}`}
			style={props.style}
		>
			<p className="mb-2">👮‍🏥🪑</p>
			<p className="text-display mb-2">
				Mint #52
				<br />
				cop-hospital-chair-fall
			</p>
			<p className="text-carbon dark:text-iron">
				Mint date: 01.01.2023
				<br />
				Lorem Ipsum
				<br />
				Price: 4.7 Eth
			</p>
		</div>
	)
}
