import Card from '@/components/card/card'
import Circle from '@/components/circle/circle'

export default function Step(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	num: `${number}`
	operator?: string
	label: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<div
			id={props.id}
			className={`relative text-center ${props.className || ''}`}
			style={props.style}
		>
			{props.operator && (
				<span
					role="presentation"
					className="text-display absolute left-1/3 mb-6 -translate-x-full text-3xl lg:left-0"
				>
					{props.operator}
				</span>
			)}
			<Circle className="mb-2">{props.num}</Circle>
			<p className="text-display mb-6 text-sm">{props.label}</p>

			<Card
				salt="blueberry"
				className="relative aspect-square"
				bgClassName="bg-gradient-to-r from-snow to-snow dark:from-nickel dark:to-nickel"
			>
				<Circle
					style={{ position: 'absolute' }}
					className="top-0 -translate-x-1/2 -translate-y-1/2 text-white dark:text-carbon"
				/>
				{props.children}
			</Card>
		</div>
	)
}
