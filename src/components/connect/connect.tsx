'use client'

import React, { useEffect, useState } from 'react'
import { BrowserProvider, Eip1193Provider } from 'ethers'
import Button from '@/components/button/button'
import Modal from '@/components/modal/modal'
import ModalContent from '@/components/modal/modalContent'

declare const window: Window &
	typeof globalThis & {
		ethereum: BrowserProvider & Eip1193Provider
	}

const ConnectWalletButton = () => {
	const [account, setAccount] = useState<string | null>(null)
	const [modalOpen, setModalOpen] = useState(false)

	const handleDismiss = () => {
		setModalOpen(false)
	}

	const handleAccountsChanged = (accounts: string[]) => {
		if (accounts.length === 0) {
			setAccount(null)
		} else {
			setAccount(accounts[0])
		}
	}

	const handleDisconnect = () => {
		setAccount(null)
	}

	useEffect(() => {
		if (typeof window.ethereum !== 'undefined') {
			void window.ethereum.on('accountsChanged', handleAccountsChanged)
			void window.ethereum.on('disconnect', handleDisconnect)

			window.ethereum
				.request({ method: 'eth_accounts' })
				.then(handleAccountsChanged)
				.catch((err) => console.error(err))

			return () => {
				void window.ethereum.removeListener(
					'accountsChanged',
					handleAccountsChanged
				)
				void window.ethereum.removeListener('disconnect', handleDisconnect)
			}
		} else {
			console.error('MetaMask is not installed')
		}
	}, [])

	const connect = async () => {
		if (typeof window.ethereum !== 'undefined') {
			try {
				await window.ethereum.request({
					method: 'wallet_requestPermissions',
					params: [{ eth_accounts: {} }],
				})

				const accounts = (await window.ethereum.request({
					method: 'eth_accounts',
				})) as string[]

				if (accounts.length > 0) {
					setAccount(accounts[0])
				}
			} catch (err) {
				console.error('Error checking wallet connection', err)
			}
		} else {
			setModalOpen(true)
		}
	}

	return (
		<>
			<Button
				disabled={!!account}
				onClick={() => void connect()}
				salt={'banana'}
			>
				{!account ? 'Connect' : `Connected: ${account.slice(0, 6)}...`}
			</Button>

			<Modal open={modalOpen} onDismiss={handleDismiss}>
				<ModalContent onClose={handleDismiss} />
			</Modal>
		</>
	)
}

export default ConnectWalletButton
