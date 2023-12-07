export default function MintCTA(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<div id={props.id} className={props.className ?? ''} style={props.style}>
			<p className="mb-2">👮‍🏥🪑</p>
			<p className="text-display mb-2">
				Mint #52
				<br />
				cop-hospital-chair-fall
			</p>
			<p className="text-carbon dark:text-iron">
				Mint date: 01.01.2023
				<br />
				Lorem Ipsum
				<br />
				{/*{price && `Price: ${price} Eth`}*/}
			</p>
		</div>
	)
}
