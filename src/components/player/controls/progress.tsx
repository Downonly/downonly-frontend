export default function Progress(props: {
	children?: React.ReactNode
	className?: string
	currentIndex: number
	id?: string
	onSeek: (index: number) => void
	style?: React.CSSProperties
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
						className="relative w-full"
						style={{
							height: `min(1.2rem, 100% / ${props.total})`,
						}}
					>
						<button
							aria-label={`Seek to ${index + 1}`}
							className={`absolute top-1/2 h-[calc(100%_-_max(0.15rem,_20%))] w-full -translate-y-1/2 bg-cole hover:scale-x-150 hover:opacity-100 focus-visible:scale-x-150 focus-visible:opacity-100 dark:bg-snow ${
								index === props.currentIndex ? 'scale-x-150' : 'opacity-30'
							}`}
							onClick={() => props.onSeek(index)}
						>
							<span className="absolute -inset-x-1 top-0 h-full" />
						</button>
					</div>
				))}
			</div>
		</div>
	)
}
