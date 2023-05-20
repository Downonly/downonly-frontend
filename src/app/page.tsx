import Card from '@/components/card/card'

export default function Home() {
	return (
		<>
			<div className="-mt-36 flex w-full flex-col justify-end sm:-mt-32 lg:flex-row">
				<div className="ms-[calc(-1*(50vw-min(35rem,45vw)))] aspect-4/3 w-screen justify-self-end bg-tomato lg:w-[50vw] lg:max-w-[40rem]" />
				<div className="flex items-center justify-center p-6 lg:w-1/2">
					<div className="text-center">
						<p className="mb-2">👮‍🏥🪑</p>
						<p className="text-display mb-2">
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
				<header className="text-display mb-4 text-4xl">
					<h1>Mint your own fall</h1>
					<p>choose now</p>
				</header>
				<p>This site is under deconstruction.</p>
			</Card>
		</>
	)
}
