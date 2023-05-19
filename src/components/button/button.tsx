import { roundedRectClipPath } from '@/utils/shape'

export default function Button({
	children,
	size,
	mode,
	tag,
}: {
	children: React.ReactNode
	size?: 'lg'
	mode?: 'secondary'
	tag?: string
}) {
	const clipPath = roundedRectClipPath(size === 'lg' ? 30 : 20)
	const Tag = (tag ?? 'button') as keyof JSX.IntrinsicElements
	return (
		<Tag
			className={`interactive inline-flex touch-manipulation select-none rounded-full border-current font-display uppercase ${
				size === 'lg' ? 'px-8 pb-2 pt-2.5' : 'px-6 pb-0.5 pt-1 text-sm'
			} ${mode === 'secondary' ? '' : 'text-sm text-snow dark:text-cole'}`}
			style={{ WebkitTapHighlightColor: 'transparent' }}
		>
			{children}
			<div
				className="absolute inset-0 -z-10 h-full w-full bg-cole dark:bg-snow"
				style={{
					clipPath,
				}}
			/>
			{mode === 'secondary' && (
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
