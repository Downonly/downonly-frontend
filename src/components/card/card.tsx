import { roundedRectClipPath } from '@/utils/shape'

export default function Card(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	const cl = `relative z-0 p-6 ${props.className}`
	return (
		<div className={cl}>
			{props.children}
			<div
				className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-carbon"
				style={{
					clipPath: roundedRectClipPath(),
				}}
			/>
		</div>
	)
}
