import MintCTA from '@/components/player/mintCTA/mintCTA'
import Canvas from '@/components/player/canvas/canvas'
import Scene from '@/components/player/scene/scene'

export default function Player(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<div
			id={props.id}
			className={`gap-x -mt-36 flex w-full flex-col justify-end sm:-mt-32 lg:flex-row ${
				props.className ?? ''
			}`}
			style={props.style}
		>
			<div className="ms-[calc(-1*(50vw-min(35rem,45vw)))] aspect-4/3 w-screen justify-self-end bg-tomato lg:w-[50vw] lg:max-w-[40rem]">
				<Canvas>
					<Scene />
				</Canvas>
			</div>
			<div className="flex items-center justify-center p-6 lg:w-1/2">
				<MintCTA />
			</div>
		</div>
	)
}
