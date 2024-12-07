import { type FC, type PropsWithChildren } from 'react'
import Button from '@/components/button/button'

interface ModalContentProps {
	modalSubject?: 'insufficient-funds'
	onClose: () => void
}

const ModalContent: FC<PropsWithChildren<ModalContentProps>> = ({
	modalSubject,
	onClose,
}) => {
	return (
		<>
			<strong className="text-display mb-4 block text-2xl">
				{modalSubject === 'insufficient-funds' ? (
					<>
						Looks like you
						<br />
						don&apos;t have sufficient funds
					</>
				) : (
					<>
						Looks like you
						<br />
						don&apos;t have a wallet
						<br />
						or it&apos;s not connected
					</>
				)}
			</strong>
			<p className="mb-4 leading-relaxed">
				{modalSubject === 'insufficient-funds' ? (
					<>The funds in you wallet do not suffice to make a purchase.</>
				) : (
					<>
						In order to perform transactions on the Ethereum network safely, you
						need a wallet, such as{' '}
						<a className="link" href="https://metamask.io/" target="_blank">
							MetaMask
						</a>{' '}
						or{' '}
						<a className="link" href="https://trustwallet.com/" target="_blank">
							Trust Wallet
						</a>{' '}
						(for mobile).
						<br />
						If you have a wallet, please check its status.
					</>
				)}
			</p>
			<Button
				style={{ display: 'block' }}
				className="ml-auto"
				size="lg"
				salt="onion"
				onClick={onClose}
			>
				Got it
			</Button>
		</>
	)
}

export default ModalContent
