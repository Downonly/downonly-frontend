export default function Progress(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
	currentIndex: number
	total: number
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
				className="flex h-full w-1 flex-col justify-end rounded-full"
				aria-labelledby={progressLabelId}
				aria-valuenow={Math.floor(
					((props.currentIndex + 1) / props.total) * 100
				)}
				role="progressbar"
			>
				{Array.from({ length: props.total }).map((_, index) => (
					<div
						key={index}
						className="w-full"
						style={{
							height: `min(1.2rem, 100% / ${props.total})`,
							paddingBlockStart: `min(0.5rem, (100% / ${props.total}) + 0.2rem)`,
						}}
					>
						<div
							className={`h-full w-full bg-cole dark:bg-snow ${
								index === props.currentIndex ? 'scale-x-150' : 'opacity-30'
							}`}
						/>
					</div>
				))}
			</div>
		</div>
	)
}
