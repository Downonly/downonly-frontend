export default function Progress(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
	progress?: number
}): JSX.Element {
	const progressLabelId = `progress-label${props.id ? '-' + props.id : ''}`
	return (
		<div
			id={props.id}
			className={`${props.className ?? ''}`}
			style={props.style}
		>
			<span className="sr-only" id={progressLabelId}>
				Progress
			</span>
			<div
				className="h-1 overflow-hidden rounded-full bg-iron dark:bg-nickel"
				aria-labelledby={progressLabelId}
				aria-valuenow={Math.floor((props.progress ?? 0) * 100)}
				role="progressbar"
			>
				<div
					className="h-full bg-cole dark:bg-snow"
					style={{ width: `${(props.progress ?? 0) * 100}%` }}
				/>
			</div>
		</div>
	)
}
