import Card from '@/components/card/card'
import Step from '@/components/mintYourFall/step/step'
import Button from '@/components/button/button'

export default function MintYourFall(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<Card
			id={props.id}
			className={`w-full ${props.className || ''}`}
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
						<div className="pt-8">
							<p className="text-display mb-2 text-sm">Dutch Auction</p>
							<p className="text-sm text-carbon dark:text-iron">
								Time: 23:55:04
								<br />
								Price: 4.7 Eth
							</p>
						</div>
						<div>
							<Button className="relative z-10" size="lg">
								Mint fall
							</Button>
						</div>
					</div>
				</Step>
			</div>
		</Card>
	)
}
