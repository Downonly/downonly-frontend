import Tube from '@/components/player/tube/tube'
import Circle from '@/components/circle/circle'

export default function LiveCam(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): JSX.Element {
	return (
		<section
			id={props.id}
			className={`${
				props.className ?? ''
			} relative left-1/2 w-screen min-w-device -translate-x-1/2 bg-white pb-14 pt-28 dark:bg-carbon`}
			style={props.style}
		>
			<div className="container">
				<header className="flex items-start justify-between">
					<h2 className="text-display do-fall do-fall-2 mb-12 px-6 text-4xl">
						Live cam
					</h2>
					<Circle size="lg" className="mr-6 text-snow dark:text-cole">
						<div id="📹" className="-rotate-12">
							📹
						</div>
					</Circle>
				</header>

				<Tube
					src="https://www.youtube-nocookie.com/embed/b9ArZHpIfMg?si=tgVuXML2f1C0XO8C"
					className="do-fall do-fall-0 mb-12 aspect-video bg-silver"
				/>
			</div>
		</section>
	)
}
