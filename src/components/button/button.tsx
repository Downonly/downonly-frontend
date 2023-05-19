import type { Properties } from 'csstype'
import { roundedRectClipPath } from '@/utils/shape'

export default function Button({
	children,
	size,
	mode,
}: {
	children: React.ReactNode
	size?: 'lg'
	mode?: 'secondary'
}) {
	const clipPath = roundedRectClipPath(size === 'lg' ? 30 : 20)
	return (
		<button
			className={`interactive inline-flex touch-manipulation select-none rounded-full border-current font-display uppercase ${
				size === 'lg' ? 'px-8 pb-2 pt-2.5' : 'px-6 pb-0.5 pt-1 text-sm'
			} ${mode === 'secondary' ? '' : 'text-sm text-snow dark:text-cole'}`}
			style={
				{ '-webkit-tap-highlight-color': 'transparent' } as Properties<string>
			}
		>
			{children}
			<div
				className="absolute inset-0 -z-10 h-full w-full bg-carbon dark:bg-snow"
				style={{
					clipPath,
				}}
			/>
			{mode === 'secondary' && (
				<div className="absolute inset-0 -z-10 h-full w-full p-0.5">
					<div
						className="h-full w-full bg-snow dark:bg-carbon"
						style={{
							clipPath,
						}}
					/>
				</div>
			)}
		</button>
	)
}
