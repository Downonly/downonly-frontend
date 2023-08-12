export default function Logo(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<svg
			id={props.id}
			viewBox="0 0 800 661"
			className={`${props.className ?? ''}`}
			style={props.style}
		>
			<path
				d="m674 564 34 32 24-31h27l1 21-34 44-3 67h-33l-1-71-44-41v-22l29 1Zm-93 2-2 96h62l1 29-93 2 1-127h31Zm-90-19V446h33l-1 16 10-9 22-7h31l18 20 7 27-2 54h-30l1-50-8-23-16-4-21 9-13 26-1 42h-30Zm-54-102 9 15 3 19-6 21-9 15-17 7-18-1-19-12-7-23 4-27 13-19 22-8 25 13Zm-25 13-12 7-4 16 5 16 12 4 11-4 7-8 1-19-11-11-9-1Zm-73-68 1-127 29 1 71 81v-82l27 1-1 126h-33l-70-87-1 87h-23ZM171 259l28 95 20-52-9-24 24-14 35 85 31-93h18v23l-39 111h-24l-21-71-27 71-22-3-38-109v-19h24Zm31-17-28-10-16-27-7-48 8-32 26-21h40l43 15 14 31v42l-20 42-26 12-34-4Zm-162-9V103l51 2 24 10 17 34-7 62-27 22H40Zm203-97-24-5-32 9-8 28 7 32 21 14 28-4 21-34-13-40Zm-180-7-1 75 30 1 20-15 1-41-12-18-38-2Z"
				style={{ fill: 'currentColor' }}
				transform="matrix(1.11 0 0 1.11 -45 -115)"
			/>
		</svg>
	)
}
