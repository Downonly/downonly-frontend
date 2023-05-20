import Link from 'next/link'
import Button from '@/components/button/button'

export default function Nav(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): JSX.Element {
	return (
		<nav
			id={props.id}
			className={`flex flex-wrap items-end justify-end gap-4 ${
				props.className || ''
			}`}
			style={props.style}
		>
			<Link href="/">
				<Button tag="span" mode="secondary">
					Start
				</Button>
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
