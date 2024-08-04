'use client'

import Polaroid from '@/components/polaroid/polaroid'
import useAuctionInfo from '@/hooks/useAuctionInfo'

export default function Minted(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	const auctionInfo = useAuctionInfo()

	if (auctionInfo?.stage === 'premint') return <></>

	return (
		<section
			id={props.id}
			className={`${props.className ?? ''}`}
			style={props.style}
		>
			<h2 className="do-fall do-fall-6 text-display mb-12 px-6 text-4xl">
				Minted
			</h2>

			<div className="gap-x grid gap-y-6 md:grid-cols-3">
				<Polaroid
					className="do-fall do-fall-3"
					salt="olives"
					emoji="👮‍🏥🪑"
					label="Label"
					description={
						<span>
							Lorem Ipsum
							<br />
							Price: 4.7 Eth
						</span>
					}
				>
					<div className="aspect-square bg-snow dark:bg-nickel" />
				</Polaroid>

				<Polaroid
					className="do-fall do-fall-7"
					salt="honeymelon"
					emoji="👮‍🏥🪑"
					label="Label"
					description={
						<span>
							Lorem Ipsum
							<br />
							Price: 4.7 Eth
						</span>
					}
				>
					<div className="aspect-square bg-snow dark:bg-nickel" />
				</Polaroid>

				<Polaroid
					className="do-fall do-fall-0"
					salt="grapes"
					emoji="👮‍🏥🪑"
					label="Label"
					description={
						<span>
							Lorem Ipsum
							<br />
							Price: 4.7 Eth
						</span>
					}
				>
					<div className="aspect-square bg-snow dark:bg-nickel" />
				</Polaroid>
			</div>
		</section>
	)
}
