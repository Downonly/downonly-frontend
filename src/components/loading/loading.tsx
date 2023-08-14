import './loading.css'

export default function Loading(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<div
			id={props.id}
			className={`loading font-display ${props.className ?? ''}`}
			style={props.style}
			aria-label="Loading"
		>
			<span>L</span>
			<span>O</span>
			<span>A</span>
			<span>D</span>
			<span>I</span>
			<span>N</span>
			<span>G</span>
		</div>
	)
}
