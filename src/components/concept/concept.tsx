import Card from '@/components/card/card'
import Circle from '@/components/circle/circle'

export default function Concept(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<div
			id={props.id}
			className={`${
				props.className || ''
			} relative left-1/2 w-screen -translate-x-1/2 bg-white py-14 dark:bg-carbon`}
			style={props.style}
		>
			<div className="container">
				<Card mode="secondary" className="py-12">
					<header className="flex items-start">
						<h2 className="text-display align-start mb-12 mr-auto text-4xl">
							The
							<br />
							Concept
						</h2>
						<Circle size="lg" className="text-white dark:text-carbon">
							<div className="-rotate-12">📹</div>
						</Circle>
					</header>

					<div className="gap-x grid gap-y-8 sm:grid-cols-2">
						<div className="aspect-video bg-tomato" />
						<div>
							<h3 className="text-display mb-6 text-2xl">
								CCTV Sim PC
								<br />
								Current State
							</h3>

							<p className="text-sm text-carbon dark:text-iron">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur. Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
						</div>
					</div>
				</Card>
			</div>
		</div>
	)
}
