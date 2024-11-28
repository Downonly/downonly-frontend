'use client'

import { getEmoji } from '@/utils/emoji'
import Card from '@/components/card/card'
import Step from '@/components/mintYourFall/step/step'
import MintCTA from '@/components/mintYourFall/mintCTA/mintCTA'
import Picker from '@/components/mintYourFall/step/picker'
import { ReactNode, useMemo, useState } from 'react'

export default function MintYourFall(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): ReactNode {
	const characters = useMemo(
		() =>
			[
				'astronaut',
				'bath',
				'business',
				'chef',
				'clown',
				'construction',
				'farm',
				'judge',
				'knight',
				'police',
				'ski',
			].map((item) => ({
				emoji: getEmoji(item),
				gif: `/gifs/characters/${item}.gif`,
			})),
		[]
	)

	const settings = useMemo(
		() =>
			[
				'antenna',
				'castle',
				'court',
				'cruise',
				'escalator',
				'ferris',
				'livingRoom',
				'scaffolding',
				'snowPark',
				'victoryColumn',
				'windPark',
			].map((item) => ({
				emoji: getEmoji(item),
				gif: `/gifs/settings/${item}.gif`,
			})),
		[]
	)

	const obstacles = useMemo(
		() =>
			[
				'balloons',
				'books',
				'horse',
				'money',
				'piano',
				'satellite',
				'shoppingCart',
				'snowCannon',
				'stove',
				'toilet',
				'transporter',
			].map((item) => ({
				emoji: getEmoji(item),
				gif: `/gifs/obstacles/${item}.gif`,
			})),
		[]
	)

	const [setting, setSetting] = useState(settings[0].emoji)
	const [character, setCharacter] = useState(characters[0].emoji)
	const [obstacle, setObstacle] = useState(obstacles[0].emoji)

	return (
		<Card
			id={props.id}
			className={`do-fall do-fall-2 ${props.className ?? ''}`}
			style={props.style}
			salt="cherry"
			tag="section"
		>
			<header className="text-display mb-12 text-4xl">
				<h2>
					<s>Choose your fall</s>
				</h2>
			</header>

			<div className="gap-x grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
				<Step salt="potato" noPadding num="1" label="Environment">
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
