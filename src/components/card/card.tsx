import { roundedRectClipPath } from '@/utils/shape'

export default function Card(props: {
	bgClassName?: string
	children?: React.ReactNode
	className?: string
	id?: string
	mode?: 'secondary'
	salt: string
	style?: React.CSSProperties
	tag?: keyof JSX.IntrinsicElements
}): JSX.Element {
	const Tag = (props.tag ?? 'div') as unknown as React.ComponentClass<{
		children: (React.ReactNode | Element)[]
		className: string
	}>
	return (
		<Tag className={`relative z-0 p-6 ${props.className}`}>
			{props.children}
			<div
				className={`absolute inset-0 -z-10 size-full ${props.bgClassName} ${
					props.mode === 'secondary'
						? 'bg-snow dark:bg-nickel'
						: 'bg-white dark:bg-carbon'
				}`}
				style={{
					clipPath: roundedRectClipPath(40, props.salt),
				}}
			/>
		</Tag>
	)
}
