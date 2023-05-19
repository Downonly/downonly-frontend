import type { Properties } from 'csstype'
import { getRoundedRectPathD } from '@/utils/shape'

export default function Button({
	children,
	size,
	mode,
}: {
	children: React.ReactNode
	size?: 'lg'
	mode?: 'secondary'
}) {
	const svgSize = 100
	const strokeWidth = Math.round(svgSize / 4)
	const pathD = getRoundedRectPathD()

	return (
		<button
			className={`interactive inline-flex touch-manipulation select-none rounded-full border-current font-display uppercase ${
				size === 'lg' ? 'px-8 pb-1.5 pt-2' : 'px-6 pb-0.5 pt-1 text-sm'
			} ${mode === 'secondary' ? '' : 'text-sm text-snow dark:text-cole'}`}
			style={
				{ '-webkit-tap-highlight-color': 'transparent' } as Properties<string>
			}
		>
			{children}
			<svg
				preserveAspectRatio="none"
				className={`absolute left-1/2 top-1/2 -z-10 inline-grid h-full w-full -translate-x-1/2 -translate-y-1/2 scale-x-110 scale-y-105 transform `}
				viewBox={`0 0 ${svgSize} ${svgSize}`}
			>
				<path
					className="fill-carbon stroke-carbon dark:fill-snow dark:stroke-snow"
					style={{
						strokeWidth,
						strokeLinejoin: 'bevel',
					}}
					d={pathD}
				/>
				{mode === 'secondary' && (
					<path
						className="origin-center fill-snow stroke-snow dark:fill-carbon dark:stroke-carbon"
						style={{
							transform: 'scaleX(0.97) scaleY(0.8)',
							strokeWidth: strokeWidth,
							strokeLinejoin: 'bevel',
						}}
						d={pathD}
					/>
				)}
			</svg>
		</button>
	)
}
