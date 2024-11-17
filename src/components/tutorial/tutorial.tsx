import Card from '@/components/card/card'
import Tube from '@/components/player/tube/tube'
import Link from '@/components/link/link'
import Details from '@/components/details/details'

export default function Tutorial(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): JSX.Element {
	return (
		<section
			id={props.id}
			className={`${
				props.className ?? ''
			} bg-secondary relative left-1/2 z-10 w-screen min-w-device -translate-x-1/2 pt-16 `}
			style={props.style}
		>
			<div className="container">
				<Card
					mode="secondary"
					className="do-fall do-fall-8 mb-12 pt-12"
					salt="orange"
				>
					<h2 className="text-display mb-8 mr-auto text-4xl">Tutorial</h2>

					<figure>
						<div className="aspect-video">
							<Tube
								src={process.env.NEXT_PUBLIC_TUBE_CONCEPT_SRC}
								className="bg-silver"
							/>
						</div>
						<figcaption className="mt-4 text-right">
							More in{' '}
							<Link
								className="interactive text-display dark:text-snow"
								href="/faq"
							>
								FAQ
							</Link>
							.
						</figcaption>
					</figure>
				</Card>

				<div className="lg:px-20">
					<Details
						className="do-fall do-fall-2"
						summary="Participation rules and numbers"
						last
					>
						<div className="flex max-w-[84ch] flex-col gap-4 px-6 text-sm leading-relaxed">
							<p>
								<b className="text-display">Fall Simulation:</b> A computer
								simulates falls involving a character, an object, and an
								environment. The falls form a continuous sequence. This is the
								core digital aspect of the game. Computer
							</p>
							<p>
								<b className="text-display">Destined to Fall:</b> This is the
								central physical component of the game. Standing on top of a
								staircase, the simulation computer moves forward every round and
								eventually falls downstairs, ending the game. It is being pushed
								by a motorized broom.
							</p>
							<p>
								<b className="text-display">
									Number of Characters, Objects, and Environments:
								</b>{' '}
								There are 11 options each for characters, objects, and
								environments. A fall is a combination of a character, object and
								environment providing 1331 combinations for gameplay.
							</p>

							<p>
								<b className="text-display">Repetition Limit:</b> Each
								character, object, and environment can be minted up to 3 times.
							</p>
							<p>
								<b className="text-display">Duration of Every Fall:</b> 11
								seconds.
							</p>
							<p>
								<b className="text-display">Dutch Auction:</b> Participants bid
								in a reverse auction to determine who gets to choose and mint
								the combination of character, object, and environment for each
								round. The Dutch auction starts with the maximum asking price
								and lowers it incrementally until a participant agrees on the
								price.
							</p>
							<p>
								<b className="text-display">Maximum Price:</b> 1.1Eth. This is
								the highest amount a participant can pay at the beginning of an
								auction, which corresponds to the maximum distance the broom
								pushes the computer in that round (1.1 cm).
							</p>
							<p>
								<b className="text-display">Minimum Price:</b> 0.1Eth. This is
								the lowest amount a participant can pay at the end of an
								auction, corresponding to the minimum distance the broom pushes
								the computer in that round (0.1 cm). The auction stays at this
								price for the last of the 11 minutes.
							</p>
							<p>
								<b className="text-display">Broom Push Distance to Edge:</b> 33
								cm. This is the total distance the motorized broom can push the
								simulation computer before it falls, and the game inevitably
								ends.
							</p>
							<p>
								<b className="text-display">
									Penalty for Non-Participation in Auction:
								</b>{' '}
								If no one participates in the auction before the countdown has
								ended, the broom pushes by the maximum penalty distance of 1.1
								cm in that round and the price resets to the Maximum Price and
								the countdown of 11 minutes starts again.
							</p>
							<p>
								<b className="text-display">Broom Movement per Round:</b> Varies
								between 0.1 to 1.1 cm per round, depending on the auction price.
							</p>
							<p>
								<b className="text-display">Auction Duration:</b> 11 minutes.
								The time allocated for each auction round where participants bid
								for the right to choose and mint a combination. Once a bid is
								successful, a break is initiated while the simulation runs and
								get’s minted as an NFT to the buyers wallet.
							</p>
							<p>
								<b className="text-display">Break Duration:</b> 33 minutes. The
								pause between each successful auction round.
							</p>
							<p>
								<b className="text-display">Total Duration of Each Round:</b> 33
								- 44 minutes. This is the combined duration of the auction and
								the break.
							</p>
							<p>
								<b className="text-display">Total Performance Duration:</b>{' '}
								between 16,5 hours (0 – 30 falls) and 24,2 hours (33 falls)
								depending on participation.
							</p>
							<p>
								<b className="text-display">End Condition:</b> The performance
								ends when the computer is pushed down the stairs.
							</p>
						</div>
					</Details>
				</div>
			</div>
		</section>
	)
}
