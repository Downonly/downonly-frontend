'use client'

export default function Stream(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): JSX.Element {
	return (
		<div
			id={props.id}
			className={`size-full ${props.className ?? ''}`}
			style={props.style}
		>
			stream
		</div>
	)
}
