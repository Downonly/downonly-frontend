import MintYourFall from '@/components/mintYourFall/mintYourFall'
import HowItWorks from '@/components/howItWorks/howItWorks'
import Minted from '@/components/minted/minted'
import Player from '@/components/player/player'
import Concept from '@/components/concept/concept'
import Faq from '@/components/faq/faq'

export default function Home() {
	return (
		<>
			<Player className="mb-24" />
			<MintYourFall className="mb-24" />
			<Minted className="mb-24" />
			<HowItWorks />
			<Concept />
			<Faq />
		</>
	)
}
