import { roundedRectClipPath } from '@/utils/shape'

export default function Button(props: {
	children: React.ReactNode
	className?: string
	size?: 'lg'
	mode?: 'secondary'
	tag?: string
}) {
	const clipPath = roundedRectClipPath(props.size === 'lg' ? 30 : 20)
	const Tag = (props.tag ?? 'button') as keyof JSX.IntrinsicElements
	return (
		<Tag
			className={`interactive inline-flex touch-manipulation select-none rounded-full border-current font-display uppercase ${
				props.size === 'lg' ? 'px-8 pb-2 pt-2.5' : 'px-6 pb-0.5 pt-1 text-sm'
			} ${
				props.mode === 'secondary' ? '' : 'text-sm text-snow dark:text-cole'
			} ${props.className || ''}`}
			style={{ WebkitTapHighlightColor: 'transparent' }}
		>
			{props.children}
			<div
				className="absolute inset-0 -z-10 h-full w-full bg-cole dark:bg-snow"
				style={{
					clipPath,
				}}
			/>
			{props.mode === 'secondary' && (
				<div className="absolute inset-0 -z-10 h-full w-full p-0.5">
					<div
						className="h-full w-full bg-snow dark:bg-cole"
						style={{
							clipPath,
						}}
					/>
				</div>
			)}
		</Tag>
	)
}
