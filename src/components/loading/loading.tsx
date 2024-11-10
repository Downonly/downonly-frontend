import './loading.css'

export default function Loading(props: {
	className?: string
	dots?: boolean
	id?: string
	style?: React.CSSProperties
	label?: string
}): JSX.Element {
	return (
		<div
			id={props.id}
			className={`loading font-display ${props.className ?? ''}`}
			style={{
				width: props.dots
					? '3.2ch'
					: `${1.2 * (props.label ?? 'Loading').length}ch`,
				...props.style,
			}}
			aria-label={props.label ?? 'Loading'}
		>
			{props.dots ? (
				<>
					<span>•</span>
					<span>•</span>
					<span>•</span>
				</>
			) : (
				(props.label ?? 'Loading')
					.split('')
					.map((item: string, index: number) => (
						<span className="uppercase" key={index}>
							{item}
						</span>
					))
			)}
		</div>
	)
}
