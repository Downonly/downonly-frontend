import { roundedRectClipPath } from '@/utils/shape'

export default function Card(props: {
	className?: string
	bgClassName?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
	mode?: 'secondary'
}): JSX.Element {
	return (
		<div className={`relative z-0 p-6 ${props.className}`}>
			{props.children}
			<div
				className={`absolute inset-0 -z-10 h-full w-full ${props.bgClassName} ${
					props.mode === 'secondary'
						? 'bg-snow dark:bg-nickel'
						: 'bg-white dark:bg-carbon'
				}`}
				style={{
					clipPath: roundedRectClipPath(),
				}}
			/>
		</div>
	)
}
