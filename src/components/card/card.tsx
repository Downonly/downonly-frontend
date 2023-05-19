import { roundedRectClipPath } from '@/utils/shape'

export default function Card({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative z-0 inline-flex p-6">
			{children}
			<div
				className="dark:bg-carbon absolute inset-0 -z-10 h-full w-full bg-white"
				style={{
					clipPath: roundedRectClipPath(),
				}}
			/>
		</div>
	)
}
