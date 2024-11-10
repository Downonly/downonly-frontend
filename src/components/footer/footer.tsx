'use client'

import Link from '@/components/link/link'
import Logo from '@/components/logo/logo'
import { usePathname } from 'next/navigation'

export default function Footer(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	const pathname = usePathname()

	return (
		<footer
			className={`do-fall do-fall-0 bg-cole pt-32 text-snow dark:bg-snow dark:text-cole ${
				props.className ?? ''
			}`}
			id={props.id}
			key={pathname}
			style={props.style}
		>
			<div className="gap-x container grid grid-cols-2 px-6 text-sm md:grid-cols-3 lg:grid-cols-3">
				<Link
					className="interactive col-span-2 origin-[30%_50%] md:col-span-1"
					href="/"
				>
					<Logo className="-mt-24 mb-12 w-44 max-w-[75%]" />
				</Link>
				<div className="mb-12 md:pl-16">
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
							<Link className="interactive" href="/terms">
								Terms
							</Link>
						</li>
						<li>
							<Link className="interactive" href="/imprint">
								Imprint
							</Link>
						</li>
						<li>
							<Link className="interactive" href="/privacy">
								Privacy
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}
