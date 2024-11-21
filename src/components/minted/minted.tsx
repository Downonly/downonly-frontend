import { ReactNode } from 'react'
import Falls from '@/components/minted/falls'

export default function Minted(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): ReactNode {
	return (
		<section
			id={props.id}
			className={`${props.className ?? ''}`}
			style={props.style}
		>
			<h2 className="do-fall do-fall-6 text-display mb-12 px-6 text-4xl">
				Minted
			</h2>

			<Falls max={6} />
		</section>
	)
}
