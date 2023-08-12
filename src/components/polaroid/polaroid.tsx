import Card from '@/components/card/card'

export default function Polaroid(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
	emoji?: string
	label?: string
	salt: string
	description?: React.ReactNode
}): JSX.Element {
	return (
		<Card
			salt={props.salt}
			id={props.id}
			className={`text-center text-sm ${props.className ?? ''}`}
			style={props.style}
		>
			<div className="mb-4">{props.children}</div>
			{props.emoji && <p className="mb-2">{props.emoji}</p>}
			{props.label && <p className="text-display mb-1">{props.label}</p>}
			{props.description && (
				<p className="text-carbon dark:text-iron">{props.description}</p>
			)}
		</Card>
	)
}
