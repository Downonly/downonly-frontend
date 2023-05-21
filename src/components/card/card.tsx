import { roundedRectClipPath } from '@/utils/shape'

export default function Card(props: {
	className?: string
	bgClassName?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<div className={`relative z-0 p-6 ${props.className}`}>
			{props.children}
			<div
				className={`absolute inset-0 -z-10 h-full w-full bg-white dark:bg-carbon ${props.bgClassName}`}
				style={{
					clipPath: roundedRectClipPath(),
				}}
			/>
		</div>
	)
}
