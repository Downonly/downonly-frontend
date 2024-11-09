import { type FC } from 'react'

interface VideoProps {
	className?: string
	style?: React.CSSProperties
	poster?: string
	src: string
	loop?: boolean
}

const Video: FC<VideoProps> = (props) => {
	return (
		<video
			onPlaying={(ev) => {
				console.info('playing')
				document.querySelectorAll('video').forEach((v) => {
					if (v !== ev.target) v.pause()
				})
			}}
			className={props.className}
			style={props.style}
			controls
			loop={props.loop}
			poster={props.poster}
		>
			<source src={props.src} type="video/mp4" />
			Download the <a href={props.src}>video</a>.
		</video>
	)
}

export default Video
