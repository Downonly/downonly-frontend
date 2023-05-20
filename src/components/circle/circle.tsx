export default function Circle(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<svg
			id={props.id}
			viewBox="0 0 158 158"
			className={`origin-center ${props.className || ''}`}
			style={{
				transform: `rotate(${Math.random()}turn)`,
				...(props.style ?? {}),
			}}
		>
			<path
				d="m202 242-28-10-16-27-7-48 8-32 26-21h40l43 15 14 31v42l-20 42-26 12-34-4Z"
				style={{ fill: 'currentColor' }}
				transform="matrix(1.2 0 0 1.11 -181 -115)"
			/>
		</svg>
	)
}
