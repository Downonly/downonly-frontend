'use client'

import Link from '@/components/link/link'
import Logo from '@/components/logo/logo'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/themeToggle/themeToggle'

export default function Nav(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): JSX.Element {
	const pathname = usePathname()

	return (
		<nav
			className={`mb-44 flex flex-col flex-wrap items-end justify-end gap-4 sm:flex-row sm:items-start ${
				props.className ?? ''
			}`}
			key={pathname}
			id={props.id}
			style={props.style}
		>
			<Link href="/" className="interactive absolute left-0 origin-[30%_80%]">
				<Logo className="do-fall do-fall-8 -mb-24 w-44" />
			</Link>
			<div className="animate-down-new-left" style={{ animationDelay: '0.4s' }}>
				<div className="-translate-y-0.5">
					<ThemeToggle className="do-fall do-fall-0" />
				</div>
			</div>
			{/*<Link className="do-fall do-fall-3" href="/team/">*/}
			{/*	<Button salt={'banana'} tag="span">*/}
			{/*		Team*/}
			{/*	</Button>*/}
			{/*</Link>*/}
		</nav>
	)
}
