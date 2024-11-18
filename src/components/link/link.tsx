'use client'

import { type UrlObject } from 'url'
import NextLink from 'next/link'
import useViewTransition from '@/hooks/useViewTransition'
import { useRouter } from 'next/navigation'

type Url = string | UrlObject

export default function Link(props: {
	children: React.ReactNode
	className?: string
	target?: string
	href: Url
	scroll?: boolean
}): JSX.Element {
	const startViewTransition = useViewTransition()
	const router = useRouter()

	const handleViewTransition = (
		ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		ev.preventDefault()
		const path = (ev.target as HTMLElement).closest('a')?.href
		if (path === location.href) return

		startViewTransition()
			.then(() => {
				if (path) {
					requestAnimationFrame(() => {
						router.push(path, { scroll: props.scroll ?? true })
					})
				}
			})
			.catch((err) => {
				console.error(err)
			})
	}

	if (typeof props.target === 'string' && typeof props.href === 'string') {
		return (
			<a className={props.className} href={props.href} target={props.target}>
				{props.children}
			</a>
		)
	}

	return (
		<NextLink
			onClick={handleViewTransition}
			href={props.href}
			className={props.className}
		>
			{props.children}
		</NextLink>
	)
}
