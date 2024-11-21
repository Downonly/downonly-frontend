import Falls from '@/components/minted/falls'
import Link from 'next/link'
import Button from '@/components/button/button'

export default function Mints() {
	return (
		<>
			<h1 className="do-fall do-fall-4 text-display mb-12 text-5xl">Mints</h1>

			<div className="mb-12">
				<Link className="do-fall do-fall-3" href="/">
					<Button salt="dragon-fruit" tag="span" arrow="left">
						Back home
					</Button>
				</Link>
			</div>

			<Falls className="mb-12" />
			<div className="mb-20">
				<Link className="do-fall do-fall-3" href="/">
					<Button salt="dragon-fruit" tag="span" arrow="left">
						Back home
					</Button>
				</Link>
			</div>
		</>
	)
}
