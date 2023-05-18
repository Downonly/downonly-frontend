export default function Button({
	children,
	size,
	mode,
}: {
	children: React.ReactNode
	size?: 'lg'
	mode?: 'secondary'
}) {
	return (
		<button
			className={`interactive inline-flex select-none rounded-full border-current font-display uppercase ${
				size === 'lg' ? 'px-8 pb-1.5 pt-2' : 'px-4 pt-0.5 text-sm'
			} ${
				mode === 'secondary'
					? 'border-2 bg-snow dark:bg-cole'
					: 'bg-cole px-4 pt-0.5 text-sm text-snow dark:bg-snow dark:text-cole'
			}`}
		>
			{children}
		</button>
	)
}
