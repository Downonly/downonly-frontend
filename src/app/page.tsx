import MintYourFall from '@/components/mintYourFall/mintYourFall'
import HowItWorks from '@/components/howItWorks/howItWorks'
import Minted from '@/components/minted/minted'
import Player from '@/components/player/player'

export default function Home() {
	return (
		<>
			<Player />

			<MintYourFall />

			<Minted />

			<HowItWorks />
		</>
	)
}
