export default function Arrow(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<svg
			id={props.id}
			className={`aspect-square w-4 origin-center transform ${
				props.className || ''
			}`}
			style={props.style}
			viewBox="0 0 110 110"
			role="presentation"
		>
			<path
				className="fill-current"
				d="M0-8.3v5.1l-4.3-3.5-3 3.5 9.6 9 4.4-4.7 5-5.4-1.4-1-1.5-1.4-2.2 2.1-2.1 2.2a856.6 856.6 0 0 1 0-11.7l-4.5.3v5.5"
				transform="matrix(0 -5.56 5.56 0 78 67.1)"
			/>
		</svg>
	)
}
