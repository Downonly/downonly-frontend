import Details from '@/components/details/details'
import Link from '@/components/link/link'

export default function Mints() {
	return (
		<>
			<h1 className="do-fall do-fall-4 text-display mb-12 text-5xl">FAQ</h1>

			<div className="container mb-24 px-6">
				<div className="flex flex-col gap-20">
					<div>
						<h3 className="text-display do-fall do-fall-3 mb-8">
							General information:
						</h3>
						<div className="lg:px-20">
							<Details
								className="do-fall do-fall-5"
								summary="What is Downonly?"
							>
								Downonly is a performative art installation that combines
								digital and physical elements to explore themes of ephemerality
								and inevitability. Participants can interact with the
								installation by bidding in a Dutch auction to choose
								combinations of characters, objects, and environments, which are
								then simulated to form a falling sequence. The physical setup
								includes a computer pushed by a motorized broom at the top of a
								staircase. The computer is moved towards the edge until it
								ultimately falls, concluding the simulation.
							</Details>

							<Details
								className="do-fall do-fall-2"
								summary="Where and when can I visit Downonly in person?"
							>
								The interactive phase of Downonly is hosted at Espacio SOLO in
								Madrid on November 20 and 21. The non-interactive phase will
								remain on display for the following month. You are welcome to
								visit and experience the installation in person during this
								period.
							</Details>

							<Details
								className="do-fall do-fall-6"
								summary="Where can I view the live installation stream?"
							>
								Besides visiting its physical space, you can watch a live feed
								of the installation on the{' '}
								<Link className="underline" href="/#📹">
									&quot;Webcam&quot; section
								</Link>{' '}
								of downonly.xyz. You can observe the computer&apos;s position on
								the staircase in real-time, as well as the ongoing falls being
								simulated.
							</Details>

							<Details
								className="do-fall do-fall-4"
								summary="How does the auction work?"
							>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat.
							</Details>

							<Details
								className="do-fall do-fall-1"
								summary="Discord & Contracts?"
								last
							>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat.
							</Details>
						</div>
					</div>

					<div>
						<h3 className="text-display do-fall do-fall-1 mb-8">
							Participation and Bidding:
						</h3>
						<div className="lg:px-20">
							<Details
								className="do-fall do-fall-5"
								summary="How do I participate in Downonly?"
							>
								To participate, you&apos;ll need to connect your Ethereum wallet
								to the Downonly smart contract through our website. Once
								connected, you can join the Dutch auctions to bid on and mint
								your preferred fall combinations. The NFT will arrive at the
								wallet that you used to pay shortly after.
							</Details>

							<Details
								className="do-fall do-fall-2"
								summary="Can I choose any combination of character, object, and environment?"
							>
								Yes, as long as each component is available within the limits of
								three uses, you are free to select any combination of character,
								object, and environment during your turn in the auction.
							</Details>

							<Details
								className="do-fall do-fall-6"
								summary="What is a Dutch auction, and how does it work in Downonly?"
							>
								A Dutch auction is a type of auction where the price starts high
								and decreases over time until a participant accepts the current
								price. In Downonly, each auction starts with a maximum price of
								1.1 Ethereum for the first bidder, decreasing to a minimum of
								0.1 Ethereum where it stays for 1 minute. Your bid determines
								how far the computer moves on the slider for that round.
							</Details>

							<Details
								className="do-fall do-fall-3"
								summary="How is the price related to the movement of the computer?"
							>
								The amount you bid in the auction directly influences the
								distance the computer is pushed by the broom. A maximum bid of
								1.1 Ethereum moves the computer 1.1 cm, accelerating its
								approach to the edge, while the minimum bid of 0.1 Ethereum
								moves it only 0.1 cm, slowing the process.
							</Details>

							<Details
								className="do-fall do-fall-7"
								summary="What happens if no one participates in an auction round?"
							>
								If no participant bids during an auction round of 11 minutes,
								the computer is automatically pushed by the maximum penalty
								distance of 1.1 cm for that round, speeding up the progression
								towards the end of the simulation.
							</Details>

							<Details
								className="do-fall do-fall-4"
								summary="For how long auctions occur during the performance?"
							>
								Auctions are scheduled to occur continuously throughout the
								performance, with each auction followed by a 33-minute break.
								The duration of each auction can vary from 0 to 11 minutes,
								depending on when a bid is placed, making the total time from
								the start of one auction to the start of the next range from 33
								to 44 minutes.
							</Details>

							<Details
								className="do-fall do-fall-2"
								summary="How long does the interactive performance last?"
							>
								The minimum runtime of the performance is approximately 16.5
								hours for 30 falls if all rounds are at maximum bids, and the
								maximum runtime is 24.2 hours for 33 falls if all rounds receive
								minimum bids or all assets are minted 3 times.
							</Details>

							<Details
								className="do-fall do-fall-1"
								summary="What guarantees a fair auction process?"
								last
							>
								The auction process in Downonly is governed by a smart contract
								on the Ethereum blockchain, which guarantees fairness and
								transparency. However, it&apos;s important to note that the
								dynamics of bidding allow for immediate auction closures with
								higher bids. Participants with the financial capability to make
								higher bids can influence which characters, objects, and
								environments fall next, introducing a hierarchy within the
								experience. This mechanism ensures that while the auction
								process itself is fair in terms of transparency and opportunity
								for participation, the influence on the sequence of events can
								be significantly swayed by those willing to spend more. Higher
								payments accelerate the movement of the computer towards the
								edge, shortening the duration of the installation and reducing
								the amount of overall simulations to be minted. Conversely,
								lower bids slow this progression, but any lack of bids results
								in a penalty that moves the computer the maximum price amount.
								Thus, the computer&apos;s inevitable approach towards the edge
								is continuous and unavoidable, with the pace variably controlled
								by participant engagement.
							</Details>
						</div>
					</div>

					<div>
						<h3 className="text-display do-fall do-fall-1 mb-8">
							Viewing and Documentation:
						</h3>
						<div className="lg:px-20">
							<Details
								className="do-fall do-fall-8"
								summary="Can I see the falls after they are minted?"
							>
								Yes, all minted falls are recorded and can be viewed in the
								&quot;Minted&quot; section of downonly.xyz. They can also be
								found on IPFS and on major NFT marketplaces, e.g., OpenSea.
							</Details>

							<Details
								className="do-fall do-fall-6"
								summary="What is stored on the blockchain?"
							>
								Each fall sequence is uniquely recorded as a GLB and an mp4. The
								data is stored on the blockchain and displayed on the website.
								This includes also details about the character, object, and
								environment combinations, the current fall distance based on the
								overall sequence. All assets are tied to the minter&apos;s
								address.
							</Details>

							<Details
								className="do-fall do-fall-7"
								summary="Are my falls stored permanently?"
							>
								Yes, all minted fall sequences from Downonly, along with
								associated data such as GLB and MP4 files, are permanently
								stored on the InterPlanetary File System (IPFS). This
								decentralized storage solution assigns each piece of content a
								unique, persistent hash, making it accessible indefinitely and
								immune to data loss typically associated with central server
								failures. Even in the event of a breakdown or discontinuation of
								the Downonly website, this data remains accessible on IPFS,
								providing eternal, tamper-proof storage. This ensures that
								participants and viewers can access the fall sequences at any
								time in the future, regardless of the status of our primary
								platform.
							</Details>

							<Details
								className="do-fall do-fall-3"
								summary="How long does it take for my minted fall to be visible on the website and on IPFS?"
							>
								Once you mint a fall in Downonly, it typically takes a few
								minutes for the transaction to be confirmed on the blockchain as
								a backend needs to communicate with the rendering machine,
								upload the files to IPFS and mint the NFT to your wallet.
								However, during times of high network congestion, there may be
								delays. Downonly has a built-in grace period to wait for network
								congestion to decrease and transaction costs to lower. This
								grace period aims to optimize the timing of uploads to ensure
								cost efficiency and speed. If the network remains congested
								beyond this grace period, Downonly will proceed to mint the fall
								regardless. Generally, you can expect your minted fall to be
								visible on both the website and IPFS within 10 to 15 minutes
								after the minting process is complete, depending on network
								conditions. This ensures that participants can access and share
								their unique digital artifacts in a timely manner.
							</Details>

							<Details
								className="do-fall do-fall-2"
								summary="How can I ensure my selected combination is unique?"
							>
								Every fall is part of a continuous sequence, and while
								combinations of characters, objects, and environments can be
								repeated, each is unique due to the unpredictable nature of the
								simulation and the ongoing narrative of falls. When you mint a
								combination, you can see it being simulated via the live webcam.
								The sound is also generated in real time and is unique to every
								piece.
							</Details>

							<Details
								className="do-fall do-fall-5"
								summary="Will the sound be unique for each digital piece? Will there be sound in the installation?"
								last
							>
								The sound is generative, meaning that every fall and its sound
								are unique; both are simulated and generated in real time.
							</Details>
						</div>
					</div>

					<div>
						<h3 className="text-display do-fall do-fall-3 mb-8">
							Technical and Security:
						</h3>
						<div className="lg:px-20">
							<Details
								className="do-fall do-fall-5"
								summary="How is the security of Downonly ensured, and where can I review the smart contract?"
							>
								The smart contract governing the auctions and interactions
								within Downonly is open source and available for public review
								on GitHub. This allows for community verification and audit,
								which helps maintain high standards of security. Additionally,
								the contract follows established Ethereum development best
								practices to ensure that all transactions are secure, and the
								data integrity is upheld.
							</Details>

							<Details
								className="do-fall do-fall-2"
								summary="Where and when can I visit Downonly in person?"
							>
								The interactive phase of Downonly is hosted at Espacio SOLO in
								Madrid on November 20 and 21. The non-interactive phase will
								remain on display for the following month. You are welcome to
								visit and experience the installation in person during this
								period.
							</Details>

							<Details
								className="do-fall do-fall-6"
								summary="How is Downonly prepared for system bugs, software errors or unexpected technical problems?"
							>
								Downonly has been carefully tested to minimize bugs and software
								errors. However, the system is still an experiment, so things
								can go wrong. In the event of an error or {'hack'} during the
								auction, our team can halt the process temporarily, providing a
								temporarily layer of security to protect the integrity of the
								platform and its participants. Should there be any unexpected
								technical issues during a live simulation, our team is able to
								address and resolve these issues quickly to minimize disruption.
							</Details>

							<Details
								className="do-fall do-fall-4"
								summary="What happens to ensure the computer really falls and does not remain hanging on the cable and continues simulating?"
							>
								To guarantee that the computer falls off the edge without
								hindrance, the cable connecting it is prepped to easily
								disconnect when the computer reaches the critical point of
								falling.
							</Details>

							<Details
								className="do-fall do-fall-1"
								summary="What if the computer reaches the edge of the staircase?"
							>
								When the computer reaches the edge and falls, it marks the end
								of the installation. The final simulation will be recorded and
								available for viewing, and no further auctions or simulations
								will take place.
							</Details>

							<Details
								className="do-fall do-fall-8"
								summary="What happens if all assets are minted 3 times but the computer still hasn’t passed 33cm to reach the edge?"
								last
							>
								If all available assets are minted three times each and the
								computer has not yet reached the edge of the staircase, the
								system will automatically activate a force-push. This ensures
								that the computer is pushed to complete the 33 cm distance to
								the edge and fall, concluding the performance.
							</Details>
						</div>
					</div>

					<div>
						<h3 className="text-display do-fall do-fall-1 mb-8">
							Economic Factors:
						</h3>
						<div className="lg:px-20">
							<Details
								className="do-fall do-fall-5"
								summary="What happens if the Ethereum gas price is too high during an auction?"
							>
								If the Ethereum gas prices are excessively high, participants
								may choose to wait until the transaction costs become more
								favorable. Downonly does not automatically adjust or pause
								auctions due to fluctuating gas prices, so participants should
								monitor gas prices and bid accordingly. Planning your
								participation during times of lower network activity may help in
								reducing these costs.
							</Details>

							<Details
								className="do-fall do-fall-2"
								summary="Are there any fees associated with participating in Downonly?"
							>
								There are no additional fees charged by Downonly for
								participating in the auctions or viewing the falls. However,
								standard Ethereum network transaction fees (gas fees) apply when
								making bids and minting falls.
							</Details>

							<Details
								className="do-fall do-fall-6"
								summary="What if the Ethereum price changes drastically during the auction?"
							>
								The bid amounts are fixed in Ethereum and do not change with
								fluctuations in market price. Participants should be aware of
								the current exchange rates and manage their bids accordingly to
								optimize their participation costs.
							</Details>

							<Details
								className="do-fall do-fall-3"
								summary="What if two participants place a bid at the same price?"
								last
							>
								In Downonly, if two participants place a bid at the same price,
								the bid that is registered first on the blockchain is given
								priority and the other transaction will revert. This is due to
								the nature of blockchain technology, where transactions are
								processed sequentially. Participants are encouraged to place
								their bids as early as possible within the auction time frame to
								secure their desired bid level.
							</Details>
						</div>
					</div>

					<div>
						<h3 className="text-display do-fall do-fall-6 mb-8">
							Contingency and Support:
						</h3>
						<div className="lg:px-20">
							<Details
								className="do-fall do-fall-7"
								summary="What is the contingency plan for electricity or Wi-Fi outages?"
							>
								In the event of an electricity or Wi-Fi outage, the Downonly
								system is designed to pause and resume from the exact point of
								interruption. Once power and connectivity are restored, the
								installation and all associated processes will continue from
								where they were halted.
							</Details>

							<Details
								className="do-fall do-fall-4"
								summary="Are there backup systems in place in case of hardware failure?"
							>
								In Downonly, the simulation computer is a unique and
								irreplaceable component of the installation. While there are no
								backups that can replace it, we have conducted multiple tests to
								ensure its stability and reliability throughout the performance.
								Should an unforeseen system failure occur, a mechanism is
								triggered to push the computer down the stairs, ensuring that
								the installation reaches its planned conclusion. This measure is
								part of our commitment to maintaining the integrity of the
								performance.
							</Details>

							<Details
								className="do-fall do-fall-2"
								summary="What support is available if I encounter problems during participation?"
								last
							>
								Downonly is managed by a small team and as such, we are unable
								to offer dedicated support. The project is experimental in
								nature, and while we strive to ensure it runs smoothly, there
								may be unforeseen issues for which we cannot take
								responsibility. Participants are encouraged to approach Downonly
								with an understanding of these limitations. For minor issues or
								queries, you may consult this FAQ section, which provides
								guidance on common questions and challenges.
							</Details>
						</div>
					</div>

					<div>
						<h3 className="text-display do-fall do-fall-1 mb-3">
							Privacy, Changes and Cancellations:
						</h3>
						<div className="lg:px-20">
							<Details
								className="do-fall do-fall-1"
								summary="How is user privacy handled within Downonly?"
							>
								While all transactions are public on the blockchain, personal
								information is not required to participate in the auctions.
								Participants can use blockchain addresses that do not link
								directly to their personal identities.
							</Details>

							<Details
								className="do-fall do-fall-6"
								summary="What if I change my mind after minting a fall?"
							>
								Once a fall is minted, the transaction is final. There are no
								refunds or exchanges possible as each minted fall is a permanent
								record on the blockchain.
							</Details>

							<Details
								className="do-fall do-fall-4"
								summary="Can I withdraw from an auction after placing a bid?"
								last
							>
								Once a bid is placed and accepted as the highest bid at that
								moment, it cannot be withdrawn. Participants should bid
								carefully and ensure they are committed to the selection and
								payment.
							</Details>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
