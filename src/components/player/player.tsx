import MintCTA from '@/components/player/mintCTA/mintCTA'
import Canvas from '@/components/player/canvas/canvas'
import Scene from '@/components/player/scene/scene'
import Controls from '@/components/player/controls/controls'

export default function Player(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<>
			<div
				id={props.id}
				className={`gap-x -mt-36 flex w-full flex-col justify-end sm:-mt-32 lg:flex-row ${
					props.className ?? ''
				}`}
				style={props.style}
			>
				<div>
					<div className="relative ms-[calc(-1*(50vw-min(35rem,45vw)))] w-screen justify-self-end lg:w-[50vw] lg:max-w-[40rem]">
						<Canvas className="mb-6 aspect-square bg-tomato">
							<Scene />
						</Canvas>
						<Controls className="mx-[calc((50vw-min(35rem,45vw)))] mb-6 lg:me-0 2xl:mx-0" />
					</div>
				</div>
				<div className="flex items-center justify-center p-6 lg:w-1/2">
					<MintCTA />
				</div>
			</div>
		</>
	)
}
