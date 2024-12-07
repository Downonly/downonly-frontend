'use client'

import { Take } from '@/components/player/types'
import { ReactNode } from 'react'
import { formatUnits } from 'ethers'
import Eth from '@/components/eth/eth'
import { getEmoji } from '@/utils/emoji'

export default function MintCTA(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	takes: Take[]
	currentTake: Take
}): ReactNode {
	return (
		<div id={props.id} className={props.className ?? ''} style={props.style}>
			<p className="font-display">🖥 ☠️</p>
			<p className="my-3 font-display">---</p>
			<p className="my-3">
				{getEmoji(props.currentTake.surface)}{' '}
				{getEmoji(props.currentTake.figure)}{' '}
				{getEmoji(props.currentTake.obstacle)}
			</p>
			<p className="font-display">
				↓ {Math.abs(Number(props.currentTake.fallDistance)).toFixed(2)} m
			</p>
			<p className="my-3 font-display uppercase">
				{props.currentTake.surface}-{props.currentTake.figure}-
				{props.currentTake.obstacle}
			</p>
			<div className="text-xs leading-relaxed text-carbon dark:text-iron">
				<p>
					{props.currentTake.mintprice && (
						<>
							<Eth eth={props.currentTake.mintprice} /> /{' '}
							{Number(
								formatUnits(props.currentTake.mintprice, 'ether')
							).toFixed(1)}{' '}
							cm
						</>
					)}
				</p>
				<p>{props.currentTake.fullname}</p>
				<p className="truncate" title={props.currentTake.buyerAddress}>
					{props.currentTake.buyerAddress}
				</p>
				<p>
					{new Date(props.currentTake.mintDate).toLocaleDateString('en-US', {
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit',
					})}
				</p>
				<p>
					<a href={props.currentTake.openSea} target="_blank" className="link">
						Open Sea
					</a>
				</p>
			</div>
		</div>
	)
}
