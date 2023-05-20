import Link from 'next/link'
import Button from '@/components/button/button'
import Logo from '@/components/logo/logo'

export default function Nav(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): JSX.Element {
	return (
		<nav
			id={props.id}
			className={`mb-44 flex flex-col flex-wrap items-end justify-end gap-4 sm:flex-row sm:items-start ${
				props.className || ''
			}`}
			style={props.style}
		>
			<Link href="/" className="interactive absolute left-0 origin-[30%_80%]">
				<Logo className="-mb-24 w-44" />
			</Link>
			<Link href="/team/">
				<Button tag="span" mode="secondary">
					Team
				</Button>
			</Link>
			<Link href="/traits/">
				<Button tag="span" mode="secondary">
					Traits
				</Button>
			</Link>
			<Link href="/playground/">
				<Button tag="span" mode="secondary">
					Playground
				</Button>
			</Link>
		</nav>
	)
}
