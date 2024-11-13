'use client'

import Button from '@/components/button/button'
import Modal from '@/components/modal/modal'
import { FC, ReactElement, useState } from 'react'
import { buy } from '@/services/ether'
import { DepositError, InsufficientFundsError } from '@/errors/errorEther'
import useAuctionInfo from '@/hooks/useAuctionInfo'
import { nameEmojiMap } from '@/utils/emoji'
import Countdown from '@/components/countdown/countdown'
import Eth from '@/components/eth/eth'

const MintCTA: FC<{
	selectedEmoji: string
}> = ({ selectedEmoji }): ReactElement => {
	const [setting, character, obstacle] = selectedEmoji.split(' ')

	const [modalOpen, setModalOpen] = useState(false)
	const [modalSubject, setModalSubject] = useState<
		'insufficient-funds' | undefined
	>()
	const handleDismiss = () => {
		setModalOpen(false)
	}

	const auctionInfo = useAuctionInfo('mintCTA')

	const [isMinting, setIsMinting] = useState(false)

	const handleMintFall = async () => {
		if (auctionInfo?.stage !== 'mint') return

		try {
			setIsMinting(true)

			const config = {
				setting: nameEmojiMap.get(setting)!,
				character: nameEmojiMap.get(character)!,
				obstacle: nameEmojiMap.get(obstacle)!,
			}

			await buy(auctionInfo.price, config)
		} catch (err) {
			if (err instanceof DepositError) {
				console.warn(err)
				setModalSubject(undefined)
				setModalOpen(true)
			} else if (err instanceof InsufficientFundsError) {
				console.warn(err)
				setModalSubject('insufficient-funds')
				setModalOpen(true)
			} else {
				console.error(err)
			}
		} finally {
			setIsMinting(false)
		}
	}

	return (
		<>
			<div className="pt-6">
				<div className="text-sm">
					{auctionInfo?.stage === 'premint' && (
						<>
							<div className="my-3">{selectedEmoji}</div>X ↦ 🖥 33 CM ↦ ☠️
						</>
					)}

					{auctionInfo?.stage === 'mint' && (
						<div className="text-xs">
							<p className="text-display mb-1 uppercase">Dutch ↓ Auction</p>
							<p>
								<Countdown seconds={auctionInfo.countdown} /> /{' '}
								<Eth eth={auctionInfo.price} />
							</p>{' '}
							<p className="my-3">{selectedEmoji}</p>
							<p className="mb-3">
								{Number(auctionInfo.distanceCurrent.toFixed(1))} cm ↦ 🖥{' '}
								{Number(auctionInfo.distanceToDeath.toFixed(1))} cm ↦ ☠️
							</p>
						</div>
					)}

					{(auctionInfo?.stage === 'inbetween-mint-push' ||
						auctionInfo?.stage === 'inbetween-mint-play') && (
						<div className="text-xs">
							<p className="text-display mb-1 uppercase">Pushing</p>
							<p className="my-3">{selectedEmoji}</p>
						</div>
					)}
				</div>
			</div>
			<div>
				<Button
					onClick={handleMintFall}
					disabled={
						!auctionInfo ||
						!('price' in auctionInfo) ||
						!auctionInfo.price ||
						auctionInfo?.stage === 'inbetween-mint-push' ||
						auctionInfo?.stage === 'inbetween-mint-play'
					}
					loading={
						isMinting ||
						auctionInfo?.stage === 'inbetween-mint-push' ||
						auctionInfo?.stage === 'inbetween-mint-play'
					}
					className="relative z-10"
					salt={'cucumber'}
					size="lg"
				>
					{auctionInfo?.stage === 'premint' &&
					auctionInfo.countdown !== undefined ? (
						<Countdown seconds={auctionInfo.countdown} />
					) : (
						'Mint'
					)}
				</Button>
			</div>

			<Modal open={modalOpen} onDismiss={handleDismiss}>
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
							In order to perform transactions on the Ethereum network safely,
							you need a wallet, such as{' '}
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
					onClick={handleDismiss}
				>
					Got it
				</Button>
			</Modal>
		</>
	)
}

export default MintCTA
