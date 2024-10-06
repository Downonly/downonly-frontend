'use client'

import useAuctionInfo from '@/hooks/useAuctionInfo'
import { Take } from '@/components/player/types'
import { useCallback } from 'react'
import { useTakes } from '@/components/player/hooks/useTakes'
import Countdown from '@/components/countdown/countdown'
import { formatUnits } from 'ethers'
import useStore from '@/hooks/useStore'

export default function MintCTA(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	currentTake: Take | undefined
}): JSX.Element {
	const auctionInfo = useAuctionInfo('playerCTA')

	const renderEmojiesCurrentTake = useCallback(() => {
		if (!props.currentTake) return <></>
		return (
			<p className="my-3">
				{props.currentTake.surface} {props.currentTake.figure}{' '}
				{props.currentTake.obstacle}
			</p>
		)
	}, [props.currentTake])

	const { getStoreState } = useStore()

	const takes = useTakes()
	if (!takes) return <></>

	return (
		<div id={props.id} className={props.className ?? ''} style={props.style}>
			{auctionInfo?.stage === 'premint' && (
				<>
					<p className="font-display">
						<Countdown seconds={auctionInfo.countdown} />
					</p>
					<p className="font-display">X ↦ 🖥 33 CM ↦ ☠️</p>
					<p className="font-display">---</p>
					<br />
					{renderEmojiesCurrentTake()} {/* TODO: Show randomized GLBs */}
				</>
			)}

			{auctionInfo?.stage === 'mint' && (
				<>
					<p className="font-display uppercase">Dutch ↓ Auction</p>
					<p className="font-display">
						{/* TODO: get real time until action ends */}
						2:10:23 / {formatUnits(auctionInfo.price, 'wei')} wei
					</p>
					<p className="font-display">
						{auctionInfo.distanceCurrent} cm ↦ 🖥 {auctionInfo.distanceToDeath}{' '}
						cm ↦ ☠️
					</p>
					<p className="font-display">---</p>
					{getStoreState().selectedEmoji}
					{/* TODO: get current fall */}
					<p className="font-display">↓ 322,4</p>
					<br />

					{/* TODO: get last mint info */}
					<div className="text-xs leading-relaxed text-carbon dark:text-iron">
						<p>1.7 E / -1.7cm</p>
						<p>name / address owner</p>
						<p>01.01.2023 2:52pm GMT</p>
						<p>link Etherscan</p>
						<p>link Market</p>
					</div>
				</>
			)}

			{/* TODO: add other stages */}
		</div>
	)
}
