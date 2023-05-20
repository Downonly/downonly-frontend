import Card from '@/components/card/card'

export default function Home() {
	return (
		<>
			<div className="flex w-full flex-col justify-end sm:flex-row">
				<div className="ms-[calc(-1*(50vw-min(35rem,45vw)))] aspect-4/3 w-screen justify-self-end bg-tomato sm:w-[50vw] sm:max-w-[40rem]" />
				<div className="h-10 sm:w-1/2"></div>
			</div>

			<Card className="w-full">
				<h1 className="mb-4 font-display text-5xl">Hi</h1>
				<p>This site is under deconstruction.</p>
			</Card>
		</>
	)
}
