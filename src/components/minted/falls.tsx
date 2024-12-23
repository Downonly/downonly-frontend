import Polaroid from '@/components/polaroid/polaroid'
import { ReactNode } from 'react'
import { getEmoji } from '@/utils/emoji'
import Video from '@/components/minted/video'
import Link from '@/components/link/link'
import Button from '@/components/button/button'
import Eth from '@/components/eth/eth'
import { getDBDump } from '@/services/dbDump'

export default function Falls(props: {
	className?: string
	max?: number
	style?: React.CSSProperties
	id?: string
}): ReactNode {
	const mints = getDBDump()

	const filteredMints = mints
		.filter((mint) => !!mint.ipfsJPEG && !!mint.ipfsMP4 && !!mint.mintprice)
		.sort((a, b) => (new Date(a.mintdate) < new Date(b.mintdate) ? 1 : -1))

	const slicedMints = filteredMints.slice(0, props.max)

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
						label={mint.fullname}
						description={
							<>
								<p>
									<Eth eth={mint.mintprice!} /> / ↓{' '}
									{Math.abs(Number(mint.fallDistance)).toFixed(2)} m
								</p>
								<p className="truncate" title={mint.buyerAddress}>
									{mint.buyerAddress}
								</p>
								<p>
									{new Date(mint.mintdate).toLocaleDateString()}
									{' - '}
									{new Date(mint.mintdate).toLocaleTimeString()}
								</p>
								<p>
									<a href={mint.openSea} target="_blank" className="link">
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
