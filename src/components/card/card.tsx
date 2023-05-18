export default function Card({ children }: { children: React.ReactNode }) {
	const size = 100
	const strokeWidth = Math.round(size / 15)
	const topLeftX = Math.round(strokeWidth + Math.random())
	const topLeftY = Math.round(strokeWidth + Math.random())
	const topRightX = Math.round(size - Math.random() - strokeWidth)
	const topRightY = Math.round(strokeWidth + Math.random())
	const bottomLeftX = Math.round(strokeWidth + Math.random())
	const bottomLeftY = Math.round(size - Math.random() - strokeWidth)
	const bottomRightX = Math.round(size - Math.random() - strokeWidth)
	const bottomRightY = Math.round(size - Math.random() - strokeWidth)

	return (
		<div className="relative z-0 inline-flex p-6">
			{children}
			<svg
				preserveAspectRatio="none"
				className="absolute left-1/2 top-1/2 -z-10 inline-grid h-full w-full -translate-x-1/2 -translate-y-1/2 scale-x-110 scale-y-105 transform"
				viewBox={`0 0 ${size} ${size}`}
			>
				<path
					className="dark:fill-carbon dark:stroke-carbon fill-white stroke-white"
					style={{
						strokeWidth: strokeWidth,
						strokeLinejoin: 'bevel',
					}}
					d={`M ${topLeftX} ${topLeftY} L ${topRightX} ${topRightY} L ${bottomRightX} ${bottomRightY} L ${bottomLeftX} ${bottomLeftY} Z`}
				/>
			</svg>
		</div>
	)
}
