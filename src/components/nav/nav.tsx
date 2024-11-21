import Link from '@/components/link/link'
import Logo from '@/components/logo/logo'
import ThemeToggle from '@/components/themeToggle/themeToggle'

export default function Nav(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
}): JSX.Element {
	return (
		<nav
			className={`mb-44 flex flex-wrap items-start justify-end gap-4 ${
				props.className ?? ''
			}`}
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
		</nav>
	)
}
