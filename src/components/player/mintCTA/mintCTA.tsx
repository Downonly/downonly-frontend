'use client'

import useAuctionInfo from '@/hooks/useAuctionInfo'
import { Take } from '@/components/player/types'
import { ReactNode } from 'react'
import { formatUnits } from 'ethers'
import useStore from '@/hooks/useStore'
import Countdown from '@/components/countdown/countdown'
import Loading from '@/components/loading/loading'
import Eth from '@/components/eth/eth'
import { getEmoji } from '@/utils/emoji'

export default function MintCTA(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	takes: Take[] | undefined
	currentTake: Take | undefined
}): ReactNode {
	const auctionInfo = useAuctionInfo('playerCTA')

	const { getStoreState } = useStore()

	if (!props.takes) {
		return null
	}

	return (
		<div id={props.id} className={props.className ?? ''} style={props.style}>
			{auctionInfo?.stage === 'premint' ? (
				<>
					{auctionInfo.countdown === undefined ? (
						<p>Waiting for auction...</p>
					) : (
						<p className="font-display">
							<Countdown seconds={auctionInfo.countdown} />
						</p>
					)}
					<p className="font-display">X ↦ 🖥 33 CM ↦ ☠️</p>
					<p className="my-3 font-display">---</p>
				</>
			) : auctionInfo?.stage === 'mint' ? (
				<>
					<p className="font-display uppercase">Dutch ↓ Auction</p>
					<p className="font-display">
						<Countdown seconds={auctionInfo.countdown} /> /{' '}
						<Eth eth={auctionInfo.price} />
					</p>
					{auctionInfo.distanceToDeath !== undefined &&
						auctionInfo.distanceCurrent !== undefined && (
							<p className="font-display">
								{Number(auctionInfo.distanceCurrent.toFixed(1))} cm ↦ 🖥{' '}
								{Number(auctionInfo.distanceToDeath.toFixed(1))} cm ↦ ☠️
							</p>
						)}
					<p className="my-3 font-display">---</p>
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
			) : auctionInfo?.stage === 'inbetween-mint-play' ||
			  auctionInfo?.stage === 'inbetween-mint-push' ? (
				<>
					{auctionInfo?.stage === 'inbetween-mint-push' ? (
						<>
							<p className="font-display uppercase">Push</p>
							{auctionInfo.distanceToDeath !== undefined &&
								auctionInfo.distanceCurrent !== undefined && (
									<p className="font-display">
										{Number(
											(
												auctionInfo.distanceToDeath +
												auctionInfo.distanceCurrent
											).toFixed(1)
										)}{' '}
										cm - {Number(auctionInfo.distanceCurrent.toFixed(1))} cm ↦
										🖥 {Number(auctionInfo.distanceToDeath.toFixed(1))} cm ↦ ☠️
									</p>
								)}
						</>
					) : (
						<>
							<p className="font-display">
								<Countdown seconds={auctionInfo.countdown} />
							</p>
							{auctionInfo.distanceToDeath !== undefined &&
								auctionInfo.distanceCurrent !== undefined && (
									<p className="font-display">
										{Number(auctionInfo.distanceCurrent.toFixed(1))} cm ↦ 🖥{' '}
										{Number(auctionInfo.distanceToDeath.toFixed(1))} cm ↦ ☠️
									</p>
								)}
						</>
					)}

					{auctionInfo.lastMinted && (
						<>
							<p className="my-3 font-display">---</p>
							<p className="my-3">
								{getEmoji(auctionInfo.lastMinted.surface)}{' '}
								{getEmoji(auctionInfo.lastMinted.figure)}{' '}
								{getEmoji(auctionInfo.lastMinted.obstacle)}
							</p>
							{auctionInfo.lastMinted?.fallDistance && (
								<p className="font-display">
									↓ {Number(auctionInfo.lastMinted.fallDistance).toFixed(2)} m
								</p>
							)}
							<p className="my-3 font-display uppercase">
								{auctionInfo.lastMinted.surface}-{auctionInfo.lastMinted.figure}
								-{auctionInfo.lastMinted.obstacle}
							</p>
							<br />

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
						</>
					)}
				</>
			) : auctionInfo?.stage === 'postmint' ? (
				<>
					<p className="font-display">🖥 ☠️</p>
					<p className="my-3 font-display">---</p>
					{props.currentTake && (
						<>
							<p className="my-3">
								{getEmoji(props.currentTake.surface)}{' '}
								{getEmoji(props.currentTake.figure)}{' '}
								{getEmoji(props.currentTake.obstacle)}
							</p>
							<p className="font-display">
								↓ {Number(props.currentTake.fallDistance).toFixed(2)} m
							</p>
							<p className="my-3 font-display uppercase">
								{props.currentTake.surface}-{props.currentTake.figure}-
								{props.currentTake.obstacle}
							</p>
							<div className="text-xs leading-relaxed text-carbon dark:text-iron">
								<p>
									{props.currentTake.mintprice && (
										<>
											<Eth eth={props.currentTake.mintprice} /> / -{' '}
											{formatUnits(props.currentTake.mintprice, 'ether')} cm
										</>
									)}
								</p>
								<p>{props.currentTake.fullname}</p>
								<p className="truncate" title={props.currentTake.buyerAddress}>
									{props.currentTake.buyerAddress}
								</p>
								<p>
									{new Date(props.currentTake.mintDate).toLocaleDateString(
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
										href={props.currentTake.openSea}
										target="_blank"
										className="link"
										rel="noreferrer noopener"
									>
										Open Sea
									</a>
								</p>
							</div>
						</>
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
