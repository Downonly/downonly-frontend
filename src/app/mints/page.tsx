'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useAuctionInfo from '@/hooks/useAuctionInfo'
import Loading from '@/components/loading/loading'
import Falls from '@/components/minted/falls'
import Link from 'next/link'
import Button from '@/components/button/button'

export default function Mints() {
	const router = useRouter()
	const auctionInfo = useAuctionInfo('mints')

	useEffect(() => {
		if (!auctionInfo) return

		if (auctionInfo.stage === 'emergency' || auctionInfo.stage === 'premint') {
			router.push('/')
		}
	}, [auctionInfo, router])

	return (
		<>
			<h1 className="do-fall do-fall-4 text-display mb-12 text-5xl">Mints</h1>

			<div className="mb-12">
				<Link className="do-fall do-fall-3" href="/">
					<Button salt="dragon-fruit" tag="span" arrow="left">
						Back home
					</Button>
				</Link>
			</div>

			{auctionInfo &&
			auctionInfo.stage !== 'emergency' &&
			auctionInfo.stage !== 'premint' &&
			auctionInfo.mints.length > 0 ? (
				<>
					<Falls auctionInfo={auctionInfo} className="mb-12" />
					<div className="mb-20">
						<Link className="do-fall do-fall-3" href="/">
							<Button salt="dragon-fruit" tag="span" arrow="left">
								Back home
							</Button>
						</Link>
					</div>
				</>
			) : (
				<div className="flex h-52 justify-center">
					<Loading />
				</div>
			)}
		</>
	)
}
