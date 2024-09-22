'use client'

import useAuctionInfo from '@/hooks/useAuctionInfo'
import { Take } from '@/components/player/types'
import { useCallback } from 'react'
import { useTakes } from '@/components/player/hooks/useTakes'

export default function MintCTA(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	currentTake: Take | undefined
}): JSX.Element {
	const auctionInfo = useAuctionInfo()

	const renderEmojies = useCallback(() => {
		if (!props.currentTake) return <></>
		return (
			<p className="my-3">
				{props.currentTake.surface} {props.currentTake.figure}{' '}
				{props.currentTake.obstacle}
			</p>
		)
	}, [props.currentTake])

	const takes = useTakes()
	if (!takes) return <></>

	return (
		<div id={props.id} className={props.className ?? ''} style={props.style}>
			{auctionInfo?.stage === 'premint' && (
				<>
					<p className="font-display">2D 18H 45M 03S</p>
					<p className="font-display">X ↦ 🖥 33 CM ↦ ☠️</p>
					<p className="font-display">---</p>
					<br />
					{renderEmojies()}
				</>
			)}

			{auctionInfo?.stage === 'mint' && (
				<>
					<p className="font-display uppercase">Dutch ↓ Auction</p>
					<p className="font-display">2:10:23 / 2.3 ETH</p>
					<p className="font-display">X ↦ 🖥 33 CM ↦ ☠️</p>
					<p className="font-display">---</p>
					{renderEmojies()}
					<p className="font-display">↓ 322,4</p>
					<br />
					<div className="text-xs leading-relaxed text-carbon dark:text-iron">
						<p>1.7 E / -1.7cm</p>
						<p>name / address owner</p>
						<p>01.01.2023 2:52pm GMT</p>
						<p>link Etherscan</p>
						<p>link Market</p>
					</div>
				</>
			)}
		</div>
	)
}
