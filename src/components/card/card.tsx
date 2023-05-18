let componentCnt = 0
export default function Card({ children }: { children: React.ReactNode }) {
	componentCnt++
	const filterId = `displace${componentCnt}`
	const baseFrequency = Math.random() * 0.00025 + 0.00025
	const numOctaves = Math.ceil(Math.random() * 3)

	return (
		<div className="relative z-0 inline-flex p-6">
			{children}
			<svg
				preserveAspectRatio="none"
				className="absolute left-1/2 top-1/2 -z-10 inline-grid h-full w-full -translate-x-1/2 -translate-y-1/2 scale-105 transform"
				viewBox="0 0 100 100"
			>
				<defs>
					<filter id={filterId}>
						<feTurbulence
							type="turbulence"
							baseFrequency={baseFrequency}
							numOctaves={numOctaves}
							result="turbulence"
						/>
						<feDisplacementMap
							in2="turbulence"
							in="SourceGraphic"
							scale="8"
							xChannelSelector="R"
							yChannelSelector="G"
						/>
					</filter>
				</defs>

				<rect
					className="dark:fill-carbon dark:stroke-carbon fill-white stroke-white stroke-2"
					width="90"
					height="90"
					x="0"
					y="1"
					style={{
						filter: `url(#${filterId})`,
						strokeWidth: '6',
						strokeLinecap: 'square',
						strokeLinejoin: 'bevel',
					}}
				/>
			</svg>
		</div>
	)
}
