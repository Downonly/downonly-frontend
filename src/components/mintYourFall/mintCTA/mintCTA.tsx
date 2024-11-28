import Button from '@/components/button/button'
import { FC, ReactElement } from 'react'

const MintCTA: FC<{
	selectedEmoji: string
}> = ({ selectedEmoji }): ReactElement => {
	return (
		<>
			<div className="pt-6">
				<div className="text-sm">
					<div className="my-3">{selectedEmoji}</div>
					<div className="text-display my-1 uppercase">---</div>
					<div className="text-display mb-1 uppercase">🖥 ☠️</div>
					<div className="text-xs">
						<p className="text-display mb-1 uppercase">Auction is over</p>
					</div>
				</div>
			</div>
			<div>
				<Button disabled className="relative z-10" salt={'cucumber'} size="lg">
					Mint
				</Button>
			</div>
		</>
	)
}

export default MintCTA
