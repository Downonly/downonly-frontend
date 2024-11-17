'use client'

import Link from '@/components/link/link'
import Logo from '@/components/logo/logo'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import useAuctionInfo from '@/hooks/useAuctionInfo'

export default function Footer(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	const pathname = usePathname()
	const auctionInfo = useAuctionInfo('footer')

	const hasMints = useMemo(() => {
		if (
			auctionInfo?.stage === 'premint' ||
			auctionInfo?.stage === 'emergency'
		) {
			return false
		}

		return !!auctionInfo?.mints?.filter(
			(mint) => !!mint.ipfsJPEG && !!mint.ipfsMP4 && !!mint.mintprice
		).length
	}, [auctionInfo])

	return (
		<footer
			className={`do-fall do-fall-0 bg-cole pt-32 text-snow dark:bg-snow dark:text-cole ${
				props.className ?? ''
			}`}
			id={props.id}
			key={pathname}
			style={props.style}
		>
			<div className="gap-x container grid grid-cols-2 px-6 text-sm lg:grid-cols-5">
				<Link className="interactive origin-[30%_50%] lg:col-span-2" href="/">
					<Logo className="-mt-24 mb-12 w-44 max-w-[75%]" />
				</Link>
				<div className="mb-12">
					<p className="text-display mb-12">Social</p>
					<ul className="list-none">
						<li>
							<Link className="interactive" href="#">
								Twitter
							</Link>
						</li>
						<li>
							<Link className="interactive" href="#">
								Discord
							</Link>
						</li>
						<li>
							<Link className="interactive" href="#">
								Instagram
							</Link>
						</li>
						<li>
							<Link className="interactive" href="#">
								GitHub
							</Link>
						</li>
					</ul>
				</div>
				<div className="mb-12">
					<p className="text-display mb-12 text-sm">Info</p>
					<ul className="list-none">
						<li>
							<Link className="interactive" href="/faq">
								FAQ
							</Link>
						</li>
						<li>
							<Link className="interactive" href="/imprint">
								Imprint / Privacy
							</Link>
						</li>
					</ul>
				</div>
				<div className="mb-12">
					<p className="text-display mb-12 text-sm">Sitemap</p>
					<ul className="list-none">
						<li>
							<Link className="interactive" href="/">
								Home
							</Link>
						</li>
						<li>
							<Link className="interactive" href="/team">
								Team
							</Link>
						</li>
						{hasMints && (
							<li>
								<Link className="interactive" href="/mints">
									Mints
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</footer>
	)
}
