'use client'

import { type FC } from 'react'
import useAuctionInfo from '@/hooks/useAuctionInfo'

interface EmergencyProps {
	className?: string
	style?: React.CSSProperties
}

const Emergency: FC<EmergencyProps> = (props) => {
	const auctionInfo = useAuctionInfo('emergency')

	if (!auctionInfo || auctionInfo.stage !== 'emergency') {
		return null
	}

	return (
		<div
			className={`do-fall do-fall-3 container flex flex-col items-center gap-6 text-center ${props.className}`}
			style={props.style}
		>
			<h1 className="font-display text-5xl">503</h1>
			<p>
				Something&apos;s cooking.
				<br />
				Please check back later.
			</p>
		</div>
	)
}

export default Emergency
