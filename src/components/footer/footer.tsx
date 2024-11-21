import Link from '@/components/link/link'
import Logo from '@/components/logo/logo'

export default function Footer(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<footer
			className={`do-fall do-fall-0 bg-cole pt-32 text-snow dark:bg-snow dark:text-cole ${
				props.className ?? ''
			}`}
			id={props.id}
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
							<Link
								className="interactive"
								href="https://x.com/nikitadiakur/"
								target="_blank"
							>
								X
							</Link>
						</li>
						<li>
							<Link
								className="interactive"
								href="https://www.instagram.com/nikitadiakur/"
								target="_blank"
							>
								Instagram
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
						<li>
							<Link
								className="interactive"
								href="https://github.com/Downonly"
								target="_blank"
							>
								GitHub
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
							<Link className="interactive" href="/mints">
								Mints
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}
