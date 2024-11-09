'use client'

import Polaroid from '@/components/polaroid/polaroid'
import useAuctionInfo from '@/hooks/useAuctionInfo'
import { ReactNode } from 'react'
import { emojiNameMap } from '@/utils/emoji'
import { formatUnits } from 'ethers'
import Video from '@/components/minted/video'

export default function Minted(props: {
	className?: string
	max?: number
	style?: React.CSSProperties
	id?: string
}): ReactNode {
	const auctionInfo = useAuctionInfo('minted')

	if (auctionInfo?.stage === 'premint' || auctionInfo?.stage === 'emergency')
		return null

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
				{auctionInfo?.mints
					.filter(
						(mint) => !!mint.ipfsJPEG && !!mint.ipfsMP4 && !!mint.mintprice
					)
					.map((mint) => (
						<Polaroid
							key={mint.id}
							className="do-fall do-fall-3"
							salt={mint.fullname}
							emoji={`${emojiNameMap.get(mint.surface)!} ${emojiNameMap.get(mint.figure)!} ${emojiNameMap.get(mint.obstacle)!}`}
							label="Label"
							description={
								<>
									<p>
										{formatUnits(mint.mintprice!, 'ether')} ETH / -
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
		</section>
	)
}
