import './loading.css'

export default function Loading(props: {
	children?: React.ReactNode
	className?: string
	dots?: boolean
	id?: string
	style?: React.CSSProperties
}): JSX.Element {
	return (
		<div
			id={props.id}
			className={`loading font-display ${props.className ?? ''} ${
				props.dots ? '[width:_3.2ch]' : '[width:_8.2ch]'
			}`}
			style={props.style}
			aria-label="Loading"
		>
			{props.dots ? (
				<>
					<span>•</span>
					<span>•</span>
					<span>•</span>
				</>
			) : (
				<>
					<span>L</span>
					<span>O</span>
					<span>A</span>
					<span>D</span>
					<span>I</span>
					<span>N</span>
					<span>G</span>
				</>
			)}
		</div>
	)
}
