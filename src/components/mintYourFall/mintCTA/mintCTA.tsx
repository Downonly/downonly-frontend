'use client'

import Button from '@/components/button/button'
import { deposit } from '@/services/ether'

export default function MintCTA(): JSX.Element {
	return (
		<>
			<div className="pt-8">
				<p className="text-display mb-2 text-sm">Dutch Auction</p>
				<p className="text-sm text-carbon dark:text-iron">
					Time: 23:55:04
					<br />
					Price: 4.7 Eth
				</p>
			</div>
			<div>
				<Button
					onClick={async () => {
						await deposit(1)
					}}
					className="relative z-10"
					salt={'cucumber'}
					size="lg"
				>
					Mint fall
				</Button>
			</div>
		</>
	)
}
