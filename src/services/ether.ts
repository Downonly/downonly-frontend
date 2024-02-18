import {
	type BaseContract,
	BrowserProvider,
	Contract,
	type ContractInterface,
	type Eip1193Provider,
	formatEther,
	getDefaultProvider,
	type JsonRpcApiProvider,
	type JsonRpcSigner,
	parseEther,
	TransactionResponse,
} from 'ethers'
import abi from './abi/dutchauction.json'
import { DepositError } from '@/errors/errorEther'

declare const window: Window &
	typeof globalThis & {
		ethereum: Eip1193Provider
	}

type MyContract = BaseContract & Omit<ContractInterface, keyof BaseContract>

const contractAddress = '0xc05CD9F2b6C23374D6557EC39DbfD5531FC5156E'
let signer: JsonRpcSigner
let provider: JsonRpcApiProvider
let contract: MyContract

async function initContract() {
	if (process.env.NEXT_PUBLIC_MOCK_ETHER) return

	if (contract) return

	if (!window.ethereum) {
		// If MetaMask is not installed, we use the default provider,
		// which is backed by a variety of third-party services (such
		// as INFURA). They do not have private keys installed and
		// only have read-only access.
		provider = getDefaultProvider('goerli') as JsonRpcApiProvider

		// Alternatively we can use the InfuraProvider.
		// provider = new InfuraProvider('matic', '45967322314d46219179ada7e414c389')
	} else {
		// Connect to the MetaMask EIP-1193 object. This is a standard
		// protocol that allows Ethers access to make all read-only
		// requests through MetaMask.
		const browserProvider = new BrowserProvider(window.ethereum)

		// It also provides an opportunity to request access to write
		// operations, which will be performed by the private key
		// that MetaMask manages for the user.
		signer = await browserProvider.getSigner()

		provider = browserProvider
	}

	contract = new Contract(contractAddress, abi, signer || provider)
}

export async function getCurrentPrice() {
	if (process.env.NEXT_PUBLIC_MOCK_ETHER) {
		return parseFloat(process.env.NEXT_PUBLIC_MOCK_ETHER_PRICE ?? '0')
	}

	await initContract()
	const currentPrice = (await contract.currentPrice()) as number
	return formatEther(currentPrice)
}

export async function getIsPaused() {
	if (process.env.NEXT_PUBLIC_MOCK_ETHER) {
		return Boolean(process.env.NEXT_PUBLIC_MOCK_ETHER_IS_PAUSED)
	}

	await initContract()
	return (await contract.isPaused()) as boolean
}

export async function getTimeUntilAuctionEnds() {
	if (process.env.NEXT_PUBLIC_MOCK_ETHER) {
		return parseInt(
			process.env.NEXT_PUBLIC_MOCK_ETHER_TIME_UNTIL_AUCTION_ENDS ?? '0',
			10
		)
	}

	await initContract()
	return parseInt((await contract.remainingTimeUntilPriceReset()) as string, 10)
}

export async function buy(ether: string) {
	if (process.env.NEXT_PUBLIC_MOCK_ETHER) {
		throw new DepositError('Deposit failed.')
	}

	await initContract()

	console.info('A')

	// TODO: If we have no signer. Tell the user to first install a wallet.

	try {
		const contractWithSigner = contract.connect(signer)

		console.info('B')

		// Call the deposit function on the contract
		const depositTx = (await (contractWithSigner as MyContract).buy(
			'rk2',
			'wc1',
			'547',
			{
				value: parseEther(ether),
				// value: parseUnits(wei.toString(), -18),
			}
		)) as TransactionResponse

		// TODO: show loader and disable button
		console.info('C')

		// Wait for the transaction to be mined
		await depositTx.wait()

		console.log('Deposit successful!')
	} catch (err) {
		throw new DepositError('Deposit failed.', { cause: err })
	}
}
