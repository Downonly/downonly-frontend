'use client'

import useAuctionInfo from '@/hooks/useAuctionInfo'
import { useMemo } from 'react'

export default function Graveyard(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): JSX.Element {
	const auctionInfo = useAuctionInfo('graveyard')

	// const deadEmoji = [
	// 	'❄️',
	// 	'🏰',
	// 	'🧑‍🚀',
	// 	'🧖',
	// 	'🧑‍🍳',
	// 	'🎡',
	// 	'🎹',
	// 	'📚',
	// 	'🎈',
	// 	'❄️',
	// 	'🏰',
	// 	'🧑‍🚀',
	// 	'🧖',
	// 	'🧑‍🍳',
	// ].map((emoji, i) => ({
	// 	key: i,
	// 	emoji,
	// }))

	const deadEmoji = useMemo(() => {
		if (
			!auctionInfo ||
			auctionInfo.stage === 'premint' ||
			auctionInfo.stage === 'emergency'
		) {
			return []
		}

		return (
			auctionInfo.remainingLives
				? Array.from(auctionInfo.remainingLives.keys()).filter((emoji) => {
						return auctionInfo.remainingLives!.get(emoji) === 0
					})
				: []
		).map((emoji, i) => ({
			key: i,
			emoji,
		}))
	}, [auctionInfo])

	if (!deadEmoji.length) {
		return <></>
	}

	return (
		<section
			id={props.id}
			className={`${props.className ?? ''} mb-24`}
			style={props.style}
		>
			<div className="do-fall do-fall-3 container flex flex-col items-center text-center grayscale">
				<p className="text-display text-4xl text-silver dark:text-iron">
					<span className="inline-flex -rotate-12">✝</span>&nbsp;
					<span className="inline-flex -translate-y-1 -rotate-6">✝</span>
					&nbsp;
					<span className="inline-flex -translate-y-2 rotate-45">✝</span>
					<span className="inline-flex -translate-y-2 rotate-12">✝</span>
					&nbsp;
					<span className="inline-flex -translate-y-3 rotate-6">✝</span>
					&nbsp;
					<span className="inline-flex -translate-y-1">✝</span>
					<span className="inline-flex -rotate-45">✝</span>&nbsp;
					<span className="inline-flex rotate-12">✝</span>
				</p>
				{/*<h2 className="text-display -mt-2 mb-6 px-6 text-4xl">Graveyard</h2>*/}

				<div className="flex max-w-96 flex-wrap justify-center gap-2 text-2xl">
					{deadEmoji.map((emoji) => (
						<div key={emoji.key}>{emoji.emoji}</div>
					))}
				</div>
			</div>
		</section>
	)
}
