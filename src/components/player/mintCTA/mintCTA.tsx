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
					<pre>{auctionInfo.countdown}</pre>
					<p className="font-display">
						{/* TODO: get real time until action ends */}
						2:10:23 / {formatUnits(auctionInfo.price, 'ether')} ETH
					</p>
					<p className="font-display">
						{Number(auctionInfo.distanceCurrent.toFixed(1))} cm ↦ 🖥{' '}
						{Number(auctionInfo.distanceToDeath.toFixed(1))} cm ↦ ☠️
					</p>
					<p className="font-display">---</p>
					{getStoreState().selectedEmoji}
					{/* TODO: get current fall distance */}
					<p className="font-display">↓ 322.4</p>
					<br />

					{auctionInfo.lastMinted && (
						<div className="text-xs leading-relaxed text-carbon dark:text-iron">
							<p>
								{formatUnits(auctionInfo.lastMinted.mintPrice, 'ether')} ETH / -
								{Number(auctionInfo.lastMinted.mintPrice).toFixed(1)} cm
							</p>
							<p>{auctionInfo.lastMinted.fullName}</p>
							<p>{auctionInfo.lastMinted.buyerAddress}</p>
							<p>
								{new Date(auctionInfo.lastMinted.mintDate).toLocaleDateString(
									'en-US',
									{
										hour: '2-digit',
										minute: '2-digit',
										second: '2-digit',
									}
								)}
							</p>
							<p>
								<a
									href={auctionInfo.lastMinted.openSea}
									target="_blank"
									className="link"
									rel="noreferrer noopener"
								>
									Open Sea
								</a>
							</p>
						</div>
					)}
				</>
			)}

			{/* TODO: add other stages */}
		</div>
	)
}
