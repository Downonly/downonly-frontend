import Circle from '@/components/circle/circle'
import Arrow from '@/components/arrow/arrow'

export default function Details(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	summary: React.ReactNode
	children: React.ReactNode
	last?: boolean
}): JSX.Element {
	return (
		<details
			id={props.id}
			className={`relative [&[open]:nth-child(even)>div]:animate-down-new-left [&[open]:nth-child(odd)>div]:animate-down-new-right [&[open]>summary>div>div:last-child]:rotate-90 ${
				props.className ?? ''
			}`}
			style={props.style}
		>
			<summary className="text-display cursor-pointer select-none list-none py-6 text-xl [&::-webkit-details-marker]:hidden [&::marker]:hidden">
				<div className="flex items-center">
					<span className="mr-auto pr-6">{props.summary}</span>
					<Circle className="shrink-0 text-snow dark:text-nickel">
						<Arrow className="rotate-90 text-carbon dark:text-snow" />
					</Circle>
				</div>
				<div
					className={`pointer-events-none absolute inset-0 opacity-20 ${
						props.last
							? 'shadow-[currentColor_0px_1px_0px_0px,_currentColor_0px_-1px_0px_0px]'
							: 'shadow-[currentColor_0px_-1px_0px_0px]'
					}`}
				/>
			</summary>
			<div className="pb-6 text-carbon dark:text-iron">{props.children}</div>
		</details>
	)
}
