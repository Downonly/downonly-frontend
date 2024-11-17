'use client'

export default function Tube(props: {
	src: string | undefined
	className?: string
	style?: React.CSSProperties
	id?: string
}): JSX.Element {
	return (
		<iframe
			id={props.id}
			className={`size-full bg-transparent ${props.className ?? ''}`}
			style={props.style}
			src={props.src}
			title="Downonly"
			frameBorder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerPolicy="strict-origin-when-cross-origin"
			allowFullScreen
		/>
	)
}
