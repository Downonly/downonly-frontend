'use client'

import Button from '@/components/button/button'
import Modal from '@/components/modal/modal'
import { useEffect, useState } from 'react'
import { buy, getCurrentPrice } from '@/services/ether'
import { DepositError } from '@/errors/errorEther'
import useAuctionInfo from '@/hooks/useAuctionInfo'

export default function MintCTA(): JSX.Element {
	const [modalOpen, setModalOpen] = useState(false)
	const handleDismiss = () => {
		setModalOpen(false)
	}

	const auctionInfo = useAuctionInfo('mintCTA')

	const [isMinting, setIsMinting] = useState(false)

	const handleMintFall = async () => {
		try {
			setIsMinting(true)
			await buy(price!)
		} catch (err) {
			if (err instanceof DepositError) {
				setModalOpen(true)
			} else {
				console.error(err)
			}
		} finally {
			setIsMinting(false)
		}
	}

	const [price, setPrice] = useState<string>()

	useEffect(() => {
		if (auctionInfo?.stage === 'mint') {
			void (async () => {
				try {
					setPrice(String(await getCurrentPrice()))
				} catch (err) {
					console.error(err)
				}
			})()
		}
	}, [auctionInfo])

	return (
		<>
			<div className="pt-6">
				<div className="text-sm">
					{auctionInfo?.stage === 'premint' && (
						<>
							<div className="my-3">🏥 👮 🪑</div>X ↦ 🖥 33 CM ↦ ☠️
						</>
					)}

					{auctionInfo?.stage === 'mint' && (
						<div className="text-xs">
							<p className="text-display mb-1 uppercase">Dutch ↓ Auction</p>
							<p>2:10:23 / 2.3 Eth</p>
							<p className="my-3">🏥 👮 🪑</p>
							<p className="mb-3">2.3 cm ↦ 🖥 33 cm ↦ ☠️</p>
						</div>
					)}
				</div>
			</div>
			<div>
				<Button
					onClick={handleMintFall}
					disabled={!price}
					loading={isMinting}
					className="relative z-10"
					salt={'cucumber'}
					size="lg"
				>
					{/* TODO: */}
					{auctionInfo?.stage === 'premint' ? '2D 18H 45M 03S' : 'Mint'}
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
