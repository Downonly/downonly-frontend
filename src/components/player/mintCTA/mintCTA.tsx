'use client'

import useAuctionInfo from '@/hooks/useAuctionInfo'
import { Take } from '@/components/player/types'
import { ReactNode } from 'react'
import { formatUnits } from 'ethers'
import useStore from '@/hooks/useStore'
import Countdown from '@/components/countdown/countdown'
import Loading from '@/components/loading/loading'
import Eth from '@/components/eth/eth'

export default function MintCTA(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	takes: Take[] | undefined
	currentTake: Take | undefined
}): ReactNode {
	const auctionInfo = useAuctionInfo('playerCTA')

	// const renderEmojiesCurrentTake = useCallback(() => {
	// 	if (!props.currentTake) return <></>
	// 	return (
	// 		<p className="my-3">
	// 			{props.currentTake.surface} {props.currentTake.figure}{' '}
	// 			{props.currentTake.obstacle}
	// 		</p>
	// 	)
	// }, [props.currentTake])

	const { getStoreState } = useStore()

	if (!props.takes) {
		return null
	}

	return (
		<div id={props.id} className={props.className ?? ''} style={props.style}>
			{auctionInfo?.stage === 'premint' ? (
				<>
					<p className="font-display">
						{/*{formatDuration(auctionInfo.countdown)}*/}
						<Countdown seconds={auctionInfo.countdown} />
					</p>
					<p className="font-display">X ↦ 🖥 33 CM ↦ ☠️</p>
					<p className="font-display">---</p>
				</>
			) : auctionInfo?.stage === 'mint' ? (
				<>
					<p className="font-display uppercase">Dutch ↓ Auction</p>
					<p className="font-display">
						<Countdown seconds={auctionInfo.countdown} /> /{' '}
						<Eth eth={auctionInfo.price} />
					</p>
					<p className="font-display">
						{Number(auctionInfo.distanceCurrent.toFixed(1))} cm ↦ 🖥{' '}
						{Number(auctionInfo.distanceToDeath.toFixed(1))} cm ↦ ☠️
					</p>
					<p className="font-display">---</p>
					{getStoreState().selectedEmoji}
					{auctionInfo.lastMinted?.fallDistance && (
						<p className="font-display">
							↓ {Number(auctionInfo.lastMinted.fallDistance).toFixed(2)} m
						</p>
					)}
					<br />

					{auctionInfo.lastMinted && (
						<div className="text-xs leading-relaxed text-carbon dark:text-iron">
							<p>
								<Eth eth={auctionInfo.lastMinted.mintPrice} /> / -
								{formatUnits(auctionInfo.lastMinted.mintPrice, 'ether')} cm
							</p>
							<p>{auctionInfo.lastMinted.fullName}</p>
							<p
								className="truncate"
								title={auctionInfo.lastMinted.buyerAddress}
							>
								{auctionInfo.lastMinted.buyerAddress}
							</p>
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
			) : auctionInfo?.stage === 'inbetween-mint-push' ||
			  auctionInfo?.stage === 'inbetween-mint-play' ? (
				<>
					<p className="font-display uppercase">Push</p>
					<p className="font-display">
						{Number(auctionInfo.distanceCurrent.toFixed(1))} cm ↦ 🖥{' '}
						{Number(auctionInfo.distanceToDeath.toFixed(1))} cm ↦ ☠️
					</p>
					<p className="font-display">---</p>
					{getStoreState().selectedEmoji}
					{auctionInfo.lastMinted?.fallDistance && (
						<p className="font-display">
							↓ {Number(auctionInfo.lastMinted.fallDistance).toFixed(2)} m
						</p>
					)}
					<br />

					{auctionInfo.lastMinted && (
						<div className="text-xs leading-relaxed text-carbon dark:text-iron">
							<p>
								<Eth eth={auctionInfo.lastMinted.mintPrice} /> / -
								{formatUnits(auctionInfo.lastMinted.mintPrice, 'ether')} cm
							</p>
							<p>{auctionInfo.lastMinted.fullName}</p>
							<p
								className="truncate"
								title={auctionInfo.lastMinted.buyerAddress}
							>
								{auctionInfo.lastMinted.buyerAddress}
							</p>
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
			) : (
				<div className="lg:-translate-y-8">
					<p className="font-display uppercase">Dutch ↓ Auction</p>
					<br />
					<Loading className="mx-auto" />
				</div>
			)}
		</div>
	)
}
