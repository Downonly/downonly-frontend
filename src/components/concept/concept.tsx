export default function Concept(props: {
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
				<h2 className="text-display do-fall do-fall-2 mb-12 px-6 text-4xl">
					Concept
				</h2>

				<div className="flex flex-col gap-4 px-6 leading-relaxed text-carbon dark:text-iron">
					<p>
						Downonly is a time-limited performative work that combines an
						installation, an interactive game and a series of digital artworks.
						It gives participants a chance to engage in an experience centered
						around the concept of falling.
					</p>
					<p>
						People can join on downonly.xyz, where they use blockchain
						technology to bid on simulations. These simulations run on a
						computer placed at the top of a staircase, which is gradually pushed
						towards the edge. The rate of the push depends on the level of user
						participation. Once the computer is over the edge, it falls and
						self-destructs, marking the end of the simulation and the conclusion
						of the work.
					</p>
					<p>
						The interactive phase will take place on November 20 and 21, and
						will continue to be available for the following month at Espacio
						SOLO in Madrid.
					</p>
				</div>
			</div>
		</section>
	)
}
