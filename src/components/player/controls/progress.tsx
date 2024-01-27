import { type Take } from '@/components/player/player'

export default function Progress(props: {
	children?: React.ReactNode
	className?: string
	currentIndex: number
	id?: string
	loaded: Set<string>
	onSeek: (index: number) => void
	style?: React.CSSProperties
	takes: Take[] | undefined
}): JSX.Element {
	const progressLabelId = `progress-label${props.id ? '-' + props.id : ''}`
	const total = props.takes?.length ?? 0

	const isLoading = (index: number) => {
		if (!props.takes?.length) return false
		if (index === props.currentIndex) return false
		if (index < props.currentIndex) {
			if (index + props.takes.length > props.currentIndex - 3) {
				return false
			}
		} else {
			if (index > props.currentIndex + 3) {
				return false
			}
		}
		if (props.loaded.has(props.takes[index].modelURL)) {
			return false
		}
		return true
	}

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
				aria-valuenow={Math.floor(((props.currentIndex + 1) / total) * 100)}
				role="progressbar"
			>
				{props.takes?.map((take, index) => (
					<div
						key={index}
						className="relative w-full"
						style={{
							height: `min(1.2rem, 100% / ${total})`,
						}}
					>
						<button
							aria-label={`Seek to ${index + 1}`}
							className={`absolute top-1/2 h-[calc(100%_-_max(0.15rem,_20%))] w-full -translate-y-1/2 bg-cole hover:scale-x-150 hover:opacity-100 focus-visible:scale-x-150 focus-visible:opacity-100 dark:bg-snow ${
								index === props.currentIndex ? 'scale-x-150' : 'opacity-30'
							} ${isLoading(index) ? 'animate-flimmer' : ''}`}
							onClick={() => props.onSeek(index)}
							style={
								props.loaded.has(take.modelURL)
									? { backgroundColor: 'tomato' }
									: undefined
							}
						>
							<span className="absolute -inset-x-1 top-0 h-full" />
						</button>
					</div>
				))}
			</div>
		</div>
	)
}
