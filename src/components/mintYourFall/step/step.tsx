import Card from '@/components/card/card'
import Circle from '@/components/circle/circle'

export default function Step(props: {
	children?: React.ReactNode
	className?: string
	id?: string
	label: string
	noPadding?: boolean
	num: `${number}`
	operator?: string
	salt: string
	style?: React.CSSProperties
}): JSX.Element {
	return (
		<div
			id={props.id}
			className={`relative text-center ${props.className ?? ''}`}
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
			<Circle className="mb-2" salt={`circle-1-${props.salt}`}>
				{props.num}
			</Circle>
			<p className="text-display mb-10 text-sm">{props.label}</p>

			<Card
				salt={`card-${props.salt}`}
				className="relative aspect-square"
				noPadding={props.noPadding}
				bgClassName="bg-gradient-to-r from-snow to-snow dark:from-nickel dark:to-nickel"
			>
				<Circle
					className="top-0 -translate-x-1/2 -translate-y-1/2 text-white dark:text-carbon"
					salt={`circle-2-${props.salt}`}
					style={{ position: 'absolute' }}
				/>
				{props.children}
			</Card>
		</div>
	)
}
