export default function Circle(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<div
			id={props.id}
			className={`relative inline-flex aspect-square w-8 items-center justify-center ${
				props.className || ''
			}`}
			style={props.style}
		>
			<svg
				className="absolute inset-0 origin-center"
				viewBox="0 0 158 158"
				style={{
					transform: `rotate(${Math.random()}turn)`,
				}}
			>
				<path
					d="m202 242-28-10-16-27-7-48 8-32 26-21h40l43 15 14 31v42l-20 42-26 12-34-4Z"
					style={{ fill: 'currentColor' }}
					transform="matrix(1.2 0 0 1.11 -181 -115)"
				/>
			</svg>
			<span className="text-display relative text-2xl text-snow dark:text-carbon">
				{props.children}
			</span>
		</div>
	)
}
