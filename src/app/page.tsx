import Card from '@/components/card/card'
import Button from '@/components/button/button'

export default function Home() {
	return (
		<main>
			<div className="container flex flex-col items-start gap-6">
				<h1 className="font-display text-5xl">Hi</h1>
				<p>This site is under deconstruction.</p>
				<Card>
					I am a simple, slightly
					<br />
					irregular looking card.
				</Card>
				<Button>Bottun</Button>
				<Button size="lg">Larger botton</Button>
				<Button mode="secondary">Secondary</Button>
				<Button size="lg" mode="secondary">
					Large secondary botton
				</Button>
			</div>
		</main>
	)
}
