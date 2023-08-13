'use client'

import './modal.css'

import { useEffect, useRef } from 'react'
import { roundedRectClipPath } from '@/utils/shape'

export default function Modal(props: {
	children?: React.ReactNode
	className?: string
	id?: string
	open?: boolean
	style?: React.CSSProperties
	onDismiss?: () => void
}): JSX.Element {
	const dialogRef = useRef<HTMLDialogElement>(null)

	const dismiss = () => {
		if (props.onDismiss) props.onDismiss()
	}

	const handleClick = (ev: MouseEvent) => {
		if ((ev.target as HTMLElement).tagName === 'DIALOG') {
			dismiss()
		}
	}

	useEffect(() => {
		if (props.open) {
			dialogRef.current?.showModal()
		} else {
			dialogRef.current?.close()
		}
	}, [props.open])

	return (
		<dialog
			onClick={(ev) => {
				handleClick(ev as unknown as MouseEvent)
			}}
			className={`${
				props.className ?? ''
			} do-modal fixed inset-0 z-50 m-auto block overflow-visible border-0 bg-transparent p-0 text-left before:fixed before:inset-0 before:-z-10 before:bg-carbon before:opacity-50 before:content-['_']`}
			id={props.id}
			ref={dialogRef}
			style={props.style}
		>
			<div
				style={{
					clipPath: roundedRectClipPath(40, 'pineapple'),
				}}
				className="bg-white p-6 text-cole dark:bg-cole dark:text-white"
			>
				<button
					style={{ WebkitTapHighlightColor: 'transparent' }}
					className="absolute right-3 top-3 inline-block h-8 w-8 origin-center -rotate-45 touch-manipulation select-none rounded-full font-display text-4xl leading-none transition-transform hover:rotate-45"
					aria-label="Dismiss"
					onClick={dismiss}
				>
					+
				</button>
				{props.children}
			</div>
		</dialog>
	)
}
