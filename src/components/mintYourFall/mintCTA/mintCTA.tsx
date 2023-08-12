'use client'

import Button from '@/components/button/button'
import Modal from '@/components/modal/modal'
import { useState } from 'react'
// import { deposit } from '@/services/ether'

export default function MintCTA(): JSX.Element {
	const [modalOpen, setModalOpen] = useState(false)
	const handleDismiss = () => {
		setModalOpen(false)
	}

	return (
		<>
			<div className="pt-8">
				<p className="text-display mb-2 text-sm">Dutch Auction</p>
				<p className="text-sm text-carbon dark:text-iron">
					Time: 23:55:04
					<br />
					Price: 4.7 Eth
				</p>
			</div>
			<div>
				<Button
					onClick={
						// async
						() => {
							// await deposit(1)
							setModalOpen(true)
						}
					}
					className="relative z-10"
					salt={'cucumber'}
					size="lg"
				>
					Mint fall
				</Button>
			</div>
			<Modal open={modalOpen} onDismiss={handleDismiss}>
				<strong className="text-display mb-4 block text-2xl">
					Looks like you
					<br />
					don&apos;t have a wallet
				</strong>
				<p className="mb-4 leading-relaxed">
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
				</p>
				<Button
					style={{ display: 'block' }}
					className="ml-auto"
					size="lg"
					salt="onion"
					onClick={handleDismiss}
				>
					Got it
				</Button>
			</Modal>
		</>
	)
}
