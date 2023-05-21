export default function HowItWorks(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<div
			id={props.id}
			className={`${
				props.className || ''
			} relative left-1/2 w-screen -translate-x-1/2 bg-white pb-14 pt-28 dark:bg-carbon`}
			style={props.style}
		>
			<div className="container">
				<h2 className="text-display mb-12 px-6 text-4xl">
					How all
					<br />
					of this works
				</h2>

				<div className="aspect-video bg-tomato" />
			</div>
		</div>
	)
}
