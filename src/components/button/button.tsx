'use client'

import { roundedRectClipPath } from '@/utils/shape'
import Loading from '@/components/loading/loading'
import Arrow from '@/components/arrow/arrow'

export default function Button(props: {
	children: React.ReactNode
	onClick?: () => void | Promise<void>
	className?: string
	disabled?: boolean
	loading?: boolean
	style?: React.CSSProperties
	size?: 'lg'
	mode?: 'secondary'
	tag?: keyof JSX.IntrinsicElements
	arrow?: 'left' | 'right'
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
			aria-busy={props.loading ? 'true' : undefined}
			className={`interactive text-display inline-flex rounded-full border-current px-6 leading-tight ${
				props.size === 'lg' ? 'pb-2.5 pt-3' : 'pb-1 pt-1.5 text-sm'
			} ${
				props.mode === 'secondary' ? '' : 'text-sm text-snow dark:text-cole'
			} ${
				props.disabled ? props.disabled : props.loading ? 'opacity-50' : ''
			} ${props.className ?? ''}`}
			disabled={props.disabled ?? props.loading}
			onClick={props.onClick}
			style={{
				...props.style,
				// @ts-ignore
				WebkitTapHighlightColor: 'transparent',
			}}
		>
			{props.loading && (
				<Loading
					style={{
						position: 'absolute',
					}}
					className={`left-1/2 -translate-x-1/2`}
					dots
				/>
			)}
			<span className={`inline-flex gap-2 ${props.loading ? 'invisible' : ''}`}>
				{props.arrow === 'left' && (
					<Arrow className="inline-flex rotate-180 text-snow dark:text-carbon" />
				)}
				{props.children}
				{props.arrow === 'right' && (
					<Arrow className="inline-flex text-snow dark:text-carbon" />
				)}
			</span>
			<div
				className="absolute inset-0 -z-10 size-full bg-cole dark:bg-snow"
				style={{ clipPath }}
			/>
			{props.mode === 'secondary' && (
				<div className="absolute inset-0 -z-10 size-full p-0.5">
					<div
						className="size-full bg-snow dark:bg-cole"
						style={{
							clipPath,
						}}
					/>
				</div>
			)}
		</Tag>
	)
}
