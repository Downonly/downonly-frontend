'use client'

import Button from '@/components/button/button'
import Modal from '@/components/modal/modal'
import { FC, ReactElement, useState } from 'react'
import { buy } from '@/services/ether'
import { InsufficientFundsError, NoWalletError } from '@/errors/errorEther'
import useAuctionInfo from '@/hooks/useAuctionInfo'
import { nameEmojiMap } from '@/utils/emoji'
import Countdown from '@/components/countdown/countdown'
import Eth from '@/components/eth/eth'
import ModalContent from '@/components/modal/modalContent'

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
		if (
			auctionInfo?.stage !== 'mint' &&
			auctionInfo?.stage !== 'inbetween-mint-push'
		) {
			return
		}

		try {
			setIsMinting(true)

			const config = {
				setting: nameEmojiMap.get(setting)!,
				character: nameEmojiMap.get(character)!,
				obstacle: nameEmojiMap.get(obstacle)!,
			}
			if (config.obstacle === 'shoppingCart') {
				config.obstacle = 'shoppingcart'
			}

			await buy(auctionInfo.price, config)
		} catch (err) {
			if (err instanceof NoWalletError) {
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
							<div className="my-3">{selectedEmoji}</div>X ↦ 🖥 33 cm ↦ ☠️
						</>
					)}

					{(auctionInfo?.stage === 'mint' ||
						auctionInfo?.stage === 'inbetween-mint-push') && (
						<div className="text-xs">
							<p className="text-display mb-1 uppercase">Dutch ↓ Auction</p>
							<p>
								{auctionInfo?.stage === 'mint' && (
									<>
										<Countdown seconds={auctionInfo.countdown} /> /{' '}
									</>
								)}
								<Eth eth={auctionInfo.price} />
							</p>{' '}
							<p className="my-3">{selectedEmoji}</p>
							{auctionInfo.distanceToDeath !== undefined &&
								auctionInfo.distanceCurrent !== undefined && (
									<p className="mb-3">
										{Number(auctionInfo.distanceCurrent.toFixed(1))} cm ↦ 🖥{' '}
										{Number(auctionInfo.distanceToDeath.toFixed(1))} cm ↦ ☠️
									</p>
								)}
						</div>
					)}

					{auctionInfo?.stage === 'inbetween-mint-play' && (
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
						!auctionInfo || !('price' in auctionInfo) || !auctionInfo.price
					}
					loading={isMinting || auctionInfo?.stage === 'inbetween-mint-play'}
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
				<ModalContent modalSubject={modalSubject} onClose={handleDismiss} />
			</Modal>
		</>
	)
}

export default MintCTA
