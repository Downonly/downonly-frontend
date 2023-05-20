import Card from '@/components/card/card'

export default function Home() {
	return (
		<>
			<div className="flex w-full flex-col justify-end lg:flex-row">
				<div className="ms-[calc(-1*(50vw-min(35rem,45vw)))] aspect-4/3 w-screen justify-self-end bg-tomato lg:w-[50vw] lg:max-w-[40rem]" />
				<div className="flex items-center justify-center p-6 lg:w-1/2">
					<div className="text-center">
						<p className="mb-2">👮‍🏥🪑</p>
						<p className="mb-2 font-display uppercase">
							Mint #52
							<br />
							cop-hostital-chair-fall
						</p>
						<p className="text-carbon dark:text-iron">
							Mint date: 01.01.2023
							<br />
							Lorem Ipsum
							<br />
							Price: 4.7 Eth
						</p>
					</div>
				</div>
			</div>

			<Card className="w-full">
				<h1 className="mb-4 font-display text-5xl">Hi</h1>
				<p>This site is under deconstruction.</p>
			</Card>
		</>
	)
}
