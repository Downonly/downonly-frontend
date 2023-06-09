import Card from '@/components/card/card'
import Step from '@/components/mintYourFall/step/step'
// import { deposit } from '@/services/ether'
import MintCTA from '@/components/mintYourFall/mintCTA/mintCTA'

export default function MintYourFall(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<Card
			id={props.id}
			className={`${props.className || ''}`}
			style={props.style}
		>
			<header className="text-display mb-12 text-4xl">
				<h1>Mint your own fall</h1>
				<p>choose now</p>
			</header>

			<div className="gap-x grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
				<Step num="1" label="Setting" />
				<Step num="2" label="Character" operator="+" />
				<Step num="3" label="Obstacle" operator="+" />
				<Step num="4" label="Push down" operator="=">
					<div className="grid h-full grid-rows-[1fr_auto] text-center">
						<MintCTA />
					</div>
				</Step>
			</div>
		</Card>
	)
}
