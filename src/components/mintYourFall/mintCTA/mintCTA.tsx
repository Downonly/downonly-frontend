import Button from '@/components/button/button'
import { FC, ReactElement } from 'react'

const MintCTA: FC<{
	selectedEmoji: string
}> = ({ selectedEmoji }): ReactElement => {
	return (
		<>
			<div className="text-display flex flex-col justify-center text-sm">
				<div className="mt-3">{selectedEmoji}</div>
				<div className="my-1">---</div>
				<div>🖥 ☠️</div>
				<p className="mb-4 text-xs">Auction is over</p>
				<Button
					disabled
					className="relative z-10 self-center"
					salt={'cucumber'}
					size="lg"
				>
					<s>Mint</s>
				</Button>
			</div>
		</>
	)
}

export default MintCTA
