'use client'

import Card from '@/components/card/card'
import Step from '@/components/mintYourFall/step/step'
import MintCTA from '@/components/mintYourFall/mintCTA/mintCTA'
import Picker from '@/components/mintYourFall/step/picker'
import { ReactNode, useEffect, useState } from 'react'
import useStore from '@/hooks/useStore'
import useAuctionInfo from '@/hooks/useAuctionInfo'

export default function MintYourFall(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): ReactNode {
	// prettier-ignore
	const settings = [
		{ emoji: '🏰', gif: '/gifs/environment_DO_castle_10fps_6sec_300x300.gif' },
		{ emoji: '🎡', gif: '/gifs/environment_DO_ferris_10fps_6sec_300x300.gif' },
		{ emoji: '❄️', gif: '/gifs/environment_DO_snowPark_10fps_6sec_300x300.gif' },
	]
	// prettier-ignore
	const characters = [
		{ emoji: '🧑‍🚀', gif: '/gifs/character_DO_astronaut_300x300.gif' },
		{ emoji: '🧖', gif: '/gifs/character_DO_bath_300x300.gif' },
		{ emoji: '🧑‍🍳', gif: '/gifs/character_DO_chef_300x300.gif' },
	]
	// prettier-ignore
	const obstacles = [
		{ emoji: '🎈', gif: '/gifs/obstacle_DO_balloons_seq_10fps_6sec_300x300.gif' },
		{ emoji: '📚', gif: '/gifs/obstacle_DO_books_seq_10fps_6sec_300x300.gif' },
		{ emoji: '🎹', gif: '/gifs/obstacle_DO_piano_seq_10fps_6sec_300x300.gif' },
	]

	const [setting, setSetting] = useState(settings[0].emoji)
	const [character, setCharacter] = useState(characters[0].emoji)
	const [obstacle, setObstacle] = useState(obstacles[0].emoji)

	const { setStoreState } = useStore()

	useEffect(() => {
		setStoreState({ selectedEmoji: `${setting} ${character} ${obstacle}` })
	}, [character, obstacle, props, setStoreState, setting])

	const auctionInfo = useAuctionInfo('playerCTA')

	if (
		!auctionInfo ||
		!['premint', 'mint', 'inbetween-mint-push', 'inbetween-mint-play'].includes(
			auctionInfo?.stage
		)
	) {
		return null
	}

	return (
		<Card
			id={props.id}
			className={`do-fall do-fall-2 ${props.className ?? ''}`}
			style={props.style}
			salt="cherry"
			tag="section"
		>
			<header className="text-display mb-12 text-4xl">
				<h1>Choose your fall</h1>
			</header>

			<div className="gap-x grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
				<Step salt="potato" noPadding num="1" label="Setting">
					<Picker options={settings} onChange={setSetting} />
				</Step>
				<Step salt="tomato" noPadding num="2" label="Character" operator="+">
					<Picker options={characters} onChange={setCharacter} />
				</Step>
				<Step salt="carrot" noPadding num="3" label="Obstacle" operator="+">
					<Picker options={obstacles} onChange={setObstacle} />
				</Step>
				<Step salt="onion" num="4" label="Push down" operator="=">
					<div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-6 text-2xl">
						☝️
					</div>
					<div className="grid h-full grid-rows-[1fr_auto] text-center">
						<MintCTA selectedEmoji={`${setting} ${character} ${obstacle}`} />
					</div>
				</Step>
			</div>
		</Card>
	)
}
