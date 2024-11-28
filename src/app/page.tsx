import LiveCam from '@/components/liveCam/liveCam'
import Graveyard from '@/components/graveyard/graveyard'
import Minted from '@/components/minted/minted'
import Player from '@/components/player/player'
import Concept from '@/components/concept/concept'
import MintYourFall from '@/components/mintYourFall/mintYourFall'

export default function Home() {
	return (
		<>
			<h1 className="sr-only">Downonly</h1>
			<Player className="mb-24" />
			<MintYourFall className="mb-24" />
			<Graveyard />
			<Minted className="mb-24" />
			<Concept />
			<LiveCam className="pb-24" />
		</>
	)
}
