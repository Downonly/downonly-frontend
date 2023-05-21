import Details from '@/components/details/details'

export default function Faq(props: {
	className?: string
	style?: React.CSSProperties
	id?: string
	children?: React.ReactNode
}): JSX.Element {
	return (
		<div
			id={props.id}
			className={`${
				props.className || ''
			} relative left-1/2 w-screen -translate-x-1/2 bg-white pb-32 pt-14 dark:bg-carbon`}
			style={props.style}
		>
			<div className="container px-6">
				<header className="text-display mb-20">
					<h2 className="text-4xl">FAQ</h2>
					<p className="text-2xl">How it works in detail</p>
				</header>

				<div className="lg:px-20">
					<Details summary="How do I mint?">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</Details>

					<Details summary="How do I conect my wallet?">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</Details>

					<Details summary="How does the auction work?">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</Details>

					<Details summary="When does this projekt end?">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</Details>

					<Details summary="Discord & Contracts?" last>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</Details>
				</div>
			</div>
		</div>
	)
}
