import Card from '@/components/card/card'
import Step from '@/components/mintYourFall/step/step'
import MintCTA from '@/components/mintYourFall/mintCTA/mintCTA'
import Picker from '@/components/mintYourFall/step/picker'

export default function MintYourFall(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<Card
			id={props.id}
			className={`do-fall do-fall-3 ${props.className ?? ''}`}
			style={props.style}
			salt="cherry"
		>
			<header className="text-display mb-12 text-4xl">
				<h1>Mint your own fall</h1>
				<p>choose now</p>
			</header>

			<div className="gap-x grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
				<Step num="1" label="Setting">
					<Picker
						options={[{ emoji: '🏥' }, { emoji: '🏭' }, { emoji: '💒' }]}
					/>
				</Step>
				<Step num="2" label="Character" operator="+">
					<Picker
						options={[{ emoji: '👮‍♂️' }, { emoji: '👷🏻‍♂️' }, { emoji: '👨🏿‍🚒' }]}
					/>
				</Step>
				<Step num="3" label="Obstacle" operator="+">
					<Picker
						options={[{ emoji: '🛴' }, { emoji: '🛢️' }, { emoji: '🧹' }]}
					/>
				</Step>
				<Step num="4" label="Push down" operator="=">
					<div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-6 text-2xl">
						☝️
					</div>
					<div className="grid h-full grid-rows-[1fr_auto] text-center">
						<MintCTA />
					</div>
				</Step>
			</div>
		</Card>
	)
}
