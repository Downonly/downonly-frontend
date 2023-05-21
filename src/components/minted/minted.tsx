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
		></div>
	)
}
