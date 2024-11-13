import Polaroid from '@/components/polaroid/polaroid'
import { ReactNode, useMemo } from 'react'
import { getEmoji } from '@/utils/emoji'
import { formatUnits } from 'ethers'
import Video from '@/components/minted/video'
import { AuctionInfo } from '@/services/ether'
import Link from '@/components/link/link'
import Button from '@/components/button/button'
import Eth from '@/components/eth/eth'

export default function Falls(props: {
	className?: string
	max?: number
	style?: React.CSSProperties
	id?: string
	auctionInfo?: AuctionInfo
}): ReactNode {
	const filteredMints = useMemo(() => {
		if (
			!props.auctionInfo ||
			props.auctionInfo.stage === 'premint' ||
			props.auctionInfo.stage === 'emergency'
		) {
			return []
		}

		return props.auctionInfo.mints.filter(
			(mint) => !!mint.ipfsJPEG && !!mint.ipfsMP4 && !!mint.mintprice
		)
	}, [props.auctionInfo])

	const slicedMints = useMemo(() => {
		return filteredMints.slice(0, props.max)
	}, [filteredMints, props.max])

	if (
		props.auctionInfo?.stage === 'premint' ||
		props.auctionInfo?.stage === 'emergency'
	) {
		return null
	}

	return (
		<>
			<div
				id={props.id}
				className={`gap-x grid gap-y-6 md:grid-cols-3 ${props.className ?? ''}`}
				style={props.style}
			>
				{slicedMints.map((mint) => (
					<Polaroid
						key={mint.id}
						className="do-fall do-fall-3 min-w-0"
						salt={mint.fullname}
						emoji={`${getEmoji(mint.surface)} ${getEmoji(mint.figure)} ${getEmoji(mint.obstacle)}`}
						label="Label"
						description={
							<>
								<p>
									<Eth eth={mint.mintprice!} /> / -
									{formatUnits(mint.mintprice!, 'ether')} cm
								</p>
								<p className="truncate" title={mint.buyerAddress}>
									{mint.buyerAddress}
								</p>
								<p>
									<a
										href={mint.openSea}
										target="_blank"
										className="link"
										rel="noreferrer noopener"
									>
										Open Sea
									</a>
								</p>
							</>
						}
					>
						<Video
							className="aspect-square w-full bg-snow dark:bg-nickel"
							loop
							src={mint.ipfsMP4!}
							poster={mint.ipfsJPEG}
						/>
					</Polaroid>
				))}
			</div>

			{slicedMints.length < filteredMints.length && (
				<div className="mt-12 flex justify-center">
					<Link className="do-fall do-fall-3" href="/mints/">
						<Button salt={'banana'} tag="span">
							All mints
						</Button>
					</Link>
				</div>
			)}
		</>
	)
}
