'use client'

import { roundedRectClipPath } from '@/utils/shape'

export default function Button(props: {
	children: React.ReactNode
	onClick?: () => void
	className?: string
	style?: React.CSSProperties
	size?: 'lg'
	mode?: 'secondary'
	tag?: keyof JSX.IntrinsicElements
	salt: string
}) {
	const clipPath = roundedRectClipPath(
		props.size === 'lg' ? 30 : 20,
		props.salt
	)
	const Tag = (props.tag ??
		'button') as unknown as React.ComponentClass<JSX.IntrinsicElements>
	return (
		<Tag
			className={`interactive text-display inline-flex rounded-full border-current leading-tight ${
				props.size === 'lg' ? 'px-8 pb-2.5 pt-3' : 'px-6 pb-1 pt-1.5 text-sm'
			} ${
				props.mode === 'secondary' ? '' : 'text-sm text-snow dark:text-cole'
			} ${props.className ?? ''}`}
			onClick={props.onClick}
			style={{
				...props.style,
				// @ts-ignore
				WebkitTapHighlightColor: 'transparent',
			}}
		>
			{props.children}
			<div
				className="absolute inset-0 -z-10 h-full w-full bg-cole dark:bg-snow"
				style={{ clipPath }}
			/>
			{props.mode === 'secondary' && (
				<div className="absolute inset-0 -z-10 h-full w-full p-0.5">
					<div
						className="h-full w-full bg-snow dark:bg-cole"
						style={{
							clipPath,
						}}
					/>
				</div>
			)}
		</Tag>
	)
}
