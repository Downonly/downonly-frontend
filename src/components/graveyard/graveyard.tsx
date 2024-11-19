'use client'

import useAuctionInfo from '@/hooks/useAuctionInfo'
import { ReactNode, useMemo } from 'react'
import { emojiNameMap } from '@/utils/emoji'

export default function Graveyard(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): ReactNode {
	const auctionInfo = useAuctionInfo('graveyard')

	const deadEmoji = useMemo(() => {
		if (
			!auctionInfo ||
			auctionInfo.stage === 'premint' ||
			auctionInfo.stage === 'emergency'
		) {
			return []
		}

		if (auctionInfo.stage === 'postmint') {
			return Array.from(emojiNameMap.values()).flatMap((emoji, i) => {
				const dead: { key: string; emoji: string }[] = []
				for (let j = 3; j--; ) {
					dead.push({
						key: `${i}-${j}`,
						emoji,
					})
				}
				return dead
			})
		}

		console.info('auctionInfo.remainingLives', auctionInfo.remainingLives)

		return (
			auctionInfo.remainingLives
				? Array.from(auctionInfo.remainingLives.entries()).filter(
						([, lives]) => {
							return lives < 3
						}
					)
				: []
		).flatMap(([emoji, lives], i) => {
			const dead: { key: string; emoji: string }[] = []
			for (let j = 3 - lives; j--; ) {
				dead.push({
					key: `${i}-${j}`,
					emoji,
				})
			}
			return dead
		})
	}, [auctionInfo])

	if (auctionInfo?.stage === 'emergency' || !deadEmoji.length) {
		return null
	}

	return (
		<section
			id={props.id}
			className={`${props.className ?? ''} mb-24`}
			style={props.style}
		>
			<div className="do-fall do-fall-3 container flex flex-col items-center text-center grayscale">
				<p className="text-display text-4xl text-silver dark:text-iron">
					<span className="inline-flex ">+</span>
					<span className="inline-flex ">+</span>
					<span className="inline-flex ">+</span>
					<span className="inline-flex ">+</span>
					<span className="inline-flex ">+</span>
					<span className="inline-flex ">+</span>
					<span className="inline-flex ">+</span>
					<span className="inline-flex ">+</span>
				</p>

				<div className="flex max-w-prose flex-wrap justify-center gap-2 text-xl">
					{deadEmoji.map((emoji) => (
						<div key={emoji.key}>{emoji.emoji}</div>
					))}
				</div>
			</div>
		</section>
	)
}
