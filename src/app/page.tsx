import MintYourFall from '@/components/mintYourFall/mintYourFall'
import HowItWorks from '@/components/howItWorks/howItWorks'
import Graveyard from '@/components/graveyard/graveyard'
import Minted from '@/components/minted/minted'
import Player from '@/components/player/player'
import Concept from '@/components/concept/concept'
import Emergency from '@/components/emergency/emergency'

// TODO: Use pro plan on vercel?
// TODO: Empty DB
// TODO: ETH rounding

export default function Home() {
	return (
		<>
			<Emergency className="mb-24" />
			<Player className="mb-24" />
			<MintYourFall className="mb-24" />
			<Graveyard />
			<Minted className="mb-24" />
			<Concept />
			<HowItWorks className="pb-24" />
		</>
	)
}
