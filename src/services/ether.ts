import {
	type BaseContract,
	BrowserProvider,
	Contract,
	type ContractInterface,
	type Eip1193Provider,
	formatUnits,
	getDefaultProvider,
	type JsonRpcApiProvider,
	type JsonRpcSigner,
	TransactionResponse,
} from 'ethers'
import abi from './abi/dutchauction.json'
import { DepositError } from '@/errors/errorEther'
import { Row } from '@/components/player/types'

declare const window: Window &
	typeof globalThis & {
		ethereum: Eip1193Provider
	}

export type AuctionStage =
	| 'premint'
	| 'mint'
	| 'inbetween-mint-push'
	| 'inbetween-mint-play'
	| 'postmint'

interface AuctionInfoBase {
	stage: AuctionStage
}

interface AuctionInfoWithPrice extends AuctionInfoBase {
	price: bigint
	distanceCurrent: number
	distanceToDeath: number
}

export interface AuctionInfoPremint extends AuctionInfoBase {
	countdown: number // -> getRemainingPause
	stage: 'premint'
}

export interface AuctionInfoMint extends AuctionInfoWithPrice {
	stage: 'mint'
}

export interface AuctionInfoInbetweenMintPush extends AuctionInfoWithPrice {
	stage: 'inbetween-mint-push'
}

export interface AuctionInfoInbetweenMintPlay extends AuctionInfoWithPrice {
	stage: 'inbetween-mint-play'
}

export interface AuctionInfoPostmint extends AuctionInfoBase {
	stage: 'postmint'
	price?: bigint
}

export type AuctionInfo =
	| AuctionInfoPremint
	| AuctionInfoMint
	| AuctionInfoInbetweenMintPush
	| AuctionInfoInbetweenMintPlay
	| AuctionInfoPostmint

type MyContract = BaseContract & Omit<ContractInterface, keyof BaseContract>

const contractAddress: string = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!
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

export async function getAuctionInfo(): Promise<AuctionInfo> {
	const mockedAuctionStage = process.env.NEXT_PUBLIC_MOCK_AUCTION_STAGE as
		| AuctionStage
		| undefined
	if (mockedAuctionStage) {
		switch (mockedAuctionStage) {
			case 'premint': // auctionNotStarted
				return {
					stage: mockedAuctionStage,
				} as AuctionInfoPremint
			case 'mint': // auctionActive
				return {
					stage: mockedAuctionStage,
				} as AuctionInfoMint
			case 'inbetween-mint-push': // (jobState wechselt zu done / getMotorPushWithoutBuy geht hoch) + ~1min
				return {
					stage: mockedAuctionStage,
				} as AuctionInfoInbetweenMintPush
			case 'inbetween-mint-play': // getPhase ist cooldown und getRemainingPause ist größer 0
				return {
					stage: mockedAuctionStage,
				} as AuctionInfoInbetweenMintPlay
			case 'postmint': // auctionsEnded
				return {
					stage: mockedAuctionStage,
				} as AuctionInfoPostmint
		}
	}

	await initContract()

	const phase: unknown = await contract.getPhase()
	console.info('phase', phase)

	if (phase === 'auctionNotStarted') {
		const countdown = Number(await contract.initialPause())
		const info: AuctionInfoPremint = {
			countdown,
			stage: 'premint',
		}
		return info
	}

	if (phase === 'auctionActive') {
		const price = await getCurrentPrice()
		const distanceToDeath = await getDistanceToDeath(price)
		const distanceCurrent = Number(formatUnits(price, 'wei')) / 10000
		const info: AuctionInfoMint = {
			stage: 'mint',
			price,
			distanceToDeath,
			distanceCurrent,
		}
		return info
	}

	if (phase === 'auctionCooldown') {
	}

	if (phase === 'emergencyPause') {
	}

	if (phase === 'auctionsEnded') {
		const info: AuctionInfoPostmint = {
			stage: 'postmint',
			price: await getCurrentPrice(),
		}
		return info
	}

	return { stage: 'premint', countdown: 0 } as AuctionInfoPremint
}

export async function getCurrentPrice(): Promise<bigint> {
	if (process.env.NEXT_PUBLIC_MOCK_ETHER) {
		return BigInt(parseFloat(process.env.NEXT_PUBLIC_MOCK_ETHER_PRICE ?? '0'))
	}

	await initContract()

	let currentPrice: bigint
	try {
		currentPrice = (await contract.currentPrice()) as bigint
	} catch (err) {
		console.error('Whooopsi', err)
		currentPrice = 0n
	}

	console.info('currentPrice', currentPrice)
	return currentPrice
}

export async function getDistanceToDeath(price: bigint): Promise<number> {
	if (process.env.NEXT_PUBLIC_MOCK_ETHER) {
		return 28
	}

	const mints = (await fetch(`/api/mints`).then((response) =>
		response.json()
	)) as Row[]

	// TODO: check if calculation of distance to death is correct (probably not)

	const distanceDone = mints.reduce<number>((acc: number, current: Row) => {
		return acc + (current.mintprice ?? 0) / 100_000
	}, 0)

	const distanceCurrent = Number(formatUnits(price, 'wei')) / 10000

	return 33 - distanceDone - distanceCurrent
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

export async function buy(wei: bigint) {
	if (process.env.NEXT_PUBLIC_MOCK_ETHER) {
		throw new DepositError('Deposit failed.')
	}

	await initContract()

	// If we have no signer, we throw a deposit error, catch it, and
	// tell the user to first install a wallet.

	try {
		const contractWithSigner = contract.connect(signer)

		// Call the deposit function on the contract.
		const depositTx = (await (contractWithSigner as MyContract).buy(
			'rk2',
			'wc1',
			'547',
			{
				value: wei,
			}
		)) as TransactionResponse

		// Wait for the transaction to be mined.
		await depositTx.wait()
	} catch (err) {
		throw new DepositError('Deposit failed.', { cause: err })
	}
}
