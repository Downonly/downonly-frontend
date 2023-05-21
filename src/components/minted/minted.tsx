import Polaroid from '@/components/polaroid/polaroid'

export default function Minted(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<div
			id={props.id}
			className={`${props.className || ''}`}
			style={props.style}
		>
			<h2 className="text-display mb-12 px-6 text-4xl">
				Currently
				<br />
				Minted
			</h2>

			<div className="gap-x grid gap-y-6 md:grid-cols-3">
				<Polaroid
					emoji="👮‍🏥🪑"
					label="Label"
					description={
						<span>
							Lorem Ipsum
							<br />
							Price: 4.7 Eth
						</span>
					}
				>
					<div className="aspect-square bg-snow dark:bg-nickel" />
				</Polaroid>

				<Polaroid
					emoji="👮‍🏥🪑"
					label="Label"
					description={
						<span>
							Lorem Ipsum
							<br />
							Price: 4.7 Eth
						</span>
					}
				>
					<div className="aspect-square bg-snow dark:bg-nickel" />
				</Polaroid>

				<Polaroid
					emoji="👮‍🏥🪑"
					label="Label"
					description={
						<span>
							Lorem Ipsum
							<br />
							Price: 4.7 Eth
						</span>
					}
				>
					<div className="aspect-square bg-snow dark:bg-nickel" />
				</Polaroid>
			</div>
		</div>
	)
}
