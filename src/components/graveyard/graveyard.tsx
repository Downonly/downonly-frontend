import { ReactNode } from 'react'
import { emojiNameMap } from '@/utils/emoji'
import { randBetweenDeterm } from '@/utils/random'

interface EmojiEntry {
	key: string
	emoji: string
}

const sortFn = (a: EmojiEntry, b: EmojiEntry) => {
	const randomA = randBetweenDeterm(0, 10, a.key)
	const randomB = randBetweenDeterm(0, 10, b.key)
	return randomA < randomB ? -1 : 1
}

export default function Graveyard(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): ReactNode {
	const deadEmoji = Array.from(emojiNameMap.values())
		.flatMap((emoji, i) => {
			const dead: { key: string; emoji: string }[] = []
			for (let j = 3; j--; ) {
				dead.push({
					key: `${i}-${j}`,
					emoji,
				})
			}
			return dead
		})
		.sort(sortFn)

	return (
		<section
			id={props.id}
			className={`${props.className ?? ''} mb-24`}
			style={props.style}
		>
			<div className="do-fall do-fall-3 container flex flex-col items-center text-center">
				<p className="text-display text-4xl">++++++++</p>

				<div className="flex max-w-prose flex-wrap justify-center gap-2 text-xl grayscale">
					{deadEmoji.map((emoji) => (
						<div key={emoji.key}>{emoji.emoji}</div>
					))}
				</div>
			</div>
		</section>
	)
}
