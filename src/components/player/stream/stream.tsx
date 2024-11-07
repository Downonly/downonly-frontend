'use client'

export default function Stream(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): JSX.Element {
	return (
		<iframe
			id={props.id}
			className={`size-full ${props.className ?? ''}`}
			style={props.style}
			src={`https://www.youtube-nocookie.com/embed/${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}`}
			title="Downonly"
			frameBorder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerPolicy="strict-origin-when-cross-origin"
			allowFullScreen
		/>
	)
}
