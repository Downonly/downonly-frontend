import Link from 'next/link'
import Logo from '@/components/logo/logo'

export default function Footer(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<footer
			id={props.id}
			className={`mt-32 bg-cole pt-32 text-snow dark:bg-snow dark:text-cole ${
				props.className || ''
			}`}
			style={props.style}
		>
			<div className="container grid grid-cols-2 gap-6 text-sm sm:grid-cols-4">
				<Logo className="-mt-12 mb-12 w-44 max-w-[75%]" />
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
							<Link className="interactive" href="#">
								AGB
							</Link>
						</li>
						<li>
							<Link className="interactive" href="#">
								Imprint
							</Link>
						</li>
						<li>
							<Link className="interactive" href="#">
								Privacy
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
						<li>
							<Link className="interactive" href="/traits">
								Traits
							</Link>
						</li>
						<li>
							<Link className="interactive" href="/playground">
								Playground
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}
