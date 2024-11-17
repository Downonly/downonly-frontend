import Card from '@/components/card/card'
import Circle from '@/components/circle/circle'
import Tube from '@/components/player/tube/tube'
import Link from '@/components/link/link'

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
			} bg-secondary relative left-1/2 z-10 w-screen min-w-device -translate-x-1/2 py-14 `}
			style={props.style}
		>
			<div className="container">
				<Card
					mode="secondary"
					className="do-fall do-fall-8 py-12"
					salt="orange"
				>
					<header className="flex items-start">
						<h2 className="text-display mb-12 mr-auto text-4xl">
							The
							<br />
							Concept
						</h2>
						<Circle size="lg" className="text-white dark:text-carbon">
							<div id="📹" className="-rotate-12">
								📹
							</div>
						</Circle>
					</header>

					<div className="gap-x grid gap-y-8 lg:grid-cols-2">
						<figure>
							<div className="aspect-video">
								<Tube
									src={process.env.NEXT_PUBLIC_TUBE_CONCEPT_SRC}
									className="bg-silver"
								/>
							</div>
							<figcaption className="text-display mt-2">
								CCTV Sim PC Current State
							</figcaption>
						</figure>
						<div className="flex flex-col gap-4 text-sm leading-relaxed text-carbon dark:text-iron">
							<p>
								Downonly is a time-limited performative work that combines an
								installation, an interactive game and a series of digital
								artworks. It gives participants a chance to engage in an
								experience centered around the concept of falling.
							</p>
							<p>
								People can join on downonly.xyz, where they use blockchain
								technology to bid on simulations. These simulations run on a
								computer placed at the top of a staircase, which is gradually
								pushed towards the edge. The rate of the push depends on the
								level of user participation. Once the computer is over the edge,
								it falls and self-destructs, marking the end of the simulation
								and the conclusion of the work.
							</p>
							<p>
								The interactive phase will take place on November 20 and 21, and
								will continue to be available for the following month at Espacio
								SOLO in Madrid.
							</p>
							<p>
								More details in{' '}
								<Link
									className="interactive text-display dark:text-snow"
									href="/faq"
								>
									FAQ
								</Link>
								.
							</p>
						</div>
					</div>
				</Card>
			</div>
		</section>
	)
}
