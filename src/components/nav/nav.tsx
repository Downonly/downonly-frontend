'use client'

import Link from '@/components/link/link'
import Button from '@/components/button/button'
import Logo from '@/components/logo/logo'
import { usePathname } from 'next/navigation'

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
			<Link href="/team/">
				<Button
					className="do-fall do-fall-3"
					mode="secondary"
					salt={'banana'}
					tag="span"
				>
					Team
				</Button>
			</Link>
			<Link href="/traits/">
				<Button
					className="do-fall do-fall-2"
					mode="secondary"
					salt={'tomato'}
					tag="span"
				>
					Traits
				</Button>
			</Link>
			<Link href="/playground/">
				<Button
					className="do-fall do-fall-4"
					mode="secondary"
					salt={'apple'}
					tag="span"
				>
					Playground
				</Button>
			</Link>
		</nav>
	)
}
