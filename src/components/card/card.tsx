import { getRoundedRectPathD } from '@/utils/shape'

export default function Card({ children }: { children: React.ReactNode }) {
	const svgSize = 100
	const strokeWidth = Math.round(svgSize / 15)
	const pathD = getRoundedRectPathD(svgSize, strokeWidth)
	return (
		<div className="relative z-0 inline-flex p-6">
			{children}
			<svg
				preserveAspectRatio="none"
				className="absolute left-1/2 top-1/2 -z-10 inline-grid h-full w-full -translate-x-1/2 -translate-y-1/2 scale-x-110 scale-y-105 transform"
				viewBox={`0 0 ${svgSize} ${svgSize}`}
			>
				<path
					className="dark:fill-carbon dark:stroke-carbon fill-white stroke-white"
					style={{
						strokeWidth: strokeWidth,
						strokeLinejoin: 'bevel',
					}}
					d={pathD}
				/>
			</svg>
		</div>
	)
}
