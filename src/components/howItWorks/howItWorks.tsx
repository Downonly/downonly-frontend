export default function HowItWorks(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): JSX.Element {
	return (
		<section
			id={props.id}
			className={`${
				props.className ?? ''
			} relative left-1/2 w-screen min-w-device -translate-x-1/2 bg-white pb-14 pt-28 dark:bg-carbon`}
			style={props.style}
		>
			<div className="container">
				<h2 className="text-display do-fall do-fall-2 mb-12 px-6 text-4xl">
					How all
					<br />
					of this works
				</h2>

				<div className="do-fall do-fall-0 aspect-video bg-silver" />
			</div>
		</section>
	)
}
