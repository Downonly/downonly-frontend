import Link from 'next/link'
import Button from '@/components/button/button'

export default function Nav(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): JSX.Element {
	const cl = `inline-flex flex-wrap grid-cols-4 gap-4 list-none ${props.className}`
	return (
		<nav id={props.id} className={cl} style={props.style}>
			<li>
				<Link href="/">
					<Button tag="span" mode="secondary">
						Start
					</Button>
				</Link>
			</li>
			<li>
				<Link href="/team/">
					<Button tag="span" mode="secondary">
						Team
					</Button>
				</Link>
			</li>
			<li>
				<Link href="/traits/">
					<Button tag="span" mode="secondary">
						Traits
					</Button>
				</Link>
			</li>
			<li>
				<Link href="/playground/">
					<Button tag="span" mode="secondary">
						Playground
					</Button>
				</Link>
			</li>
		</nav>
	)
}
