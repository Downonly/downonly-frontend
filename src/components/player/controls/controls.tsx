import Progress from './progress'

export default function Controls(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<div
			id={props.id}
			className={`${props.className ?? ''}`}
			style={props.style}
		>
			<Progress progress={0.3} />
		</div>
	)
}
