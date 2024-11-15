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
				Looks like you
				<br />
				{modalSubject === 'insufficient-funds' ? (
					<>don&apos;t have sufficient funds</>
				) : (
					<>don&apos;t have a wallet</>
				)}
			</strong>
			<p className="mb-4 leading-relaxed">
				{modalSubject === 'insufficient-funds' ? (
					<>The funds in you wallet do not suffice to make a purchase.</>
				) : (
					<>
						In order to perform transactions on the Ethereum network safely, you
						need a wallet, such as{' '}
						<a
							className="link"
							href="https://metamask.io/"
							target="_blank"
							rel="noreferrer noopener"
						>
							MetaMask
						</a>{' '}
						or{' '}
						<a
							className="link"
							href="https://trustwallet.com/"
							target="_blank"
							rel="noreferrer noopener"
						>
							Trust Wallet
						</a>{' '}
						(for mobile).
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
