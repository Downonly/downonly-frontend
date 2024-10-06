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
import { emojiNameMap } from '@/utils/emoji'

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

type RemainingLives = Map<string, number>

type RemainingLivesRawItem = string[] | number[]
type RemainingLivesRaw = RemainingLivesRawItem[]

interface AuctionInfoBase {
	stage: AuctionStage
	remainingLives?: RemainingLives
}

// 1.1 Eth = 1.1cm

interface LastMinted {
	mintPrice: bigint
	fullName: string
	mintDate: Date
	buyerAddress: string
	openSea: string
}

interface AuctionInfoWithPrice extends AuctionInfoBase {
	price: bigint
	distanceCurrent: number
	distanceToDeath: number
	lastMinted?: LastMinted
}

export interface AuctionInfoPremint extends AuctionInfoBase {
	countdown: number // -> getRemainingPause
	stage: 'premint'
}

export interface AuctionInfoMint extends AuctionInfoWithPrice {
	stage: 'mint'
	countdown: number
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
	lastMinted?: LastMinted
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

	if (phase === 'auctionNotStarted') {
		const countdown = Number(await contract.initialPause())
		const info: AuctionInfoPremint = {
			countdown,
			stage: 'premint',
		}
		return info
	}

	let lastMinted: LastMinted | undefined = undefined
	try {
		lastMinted = await getLastMinted()
	} catch (err) {
		console.error('Failed to get last minted', err)
	}

	let remainingLives: RemainingLives | undefined = undefined
	try {
		const remainingLivesRaw =
			(await contract.getAllAssetsRemainingLives()) as RemainingLivesRaw
		remainingLives = remainingLivesRaw.reduce<RemainingLives>(
			(acc, current, i) => {
				if (i % 2 !== 0) {
					return acc
				}

				current.forEach((emojiName, j) => {
					const emoji = emojiNameMap.get(emojiName as string)
					if (!emoji) return
					acc.set(emoji, Number(remainingLivesRaw[i + 1][j]))
				})

				return acc
			},
			new Map<string, number>()
		)
	} catch (err) {
		console.error('Failed to retrieve remaining lives.', err)
	}

	if (phase === 'auctionActive') {
		const price = await getCurrentPrice()
		const distanceToDeath = await getDistanceToDeath(price)
		const countdown = await getCountdown()
		const distanceCurrent = Number(formatUnits(price, 'ether'))
		const info: AuctionInfoMint = {
			stage: 'mint',
			countdown,
			price,
			distanceToDeath,
			distanceCurrent,
			remainingLives,
			lastMinted,
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
			remainingLives,
			lastMinted,
		}
		return info
	}

	return { stage: 'premint', countdown: 0 } as AuctionInfoPremint
}

async function getCurrentPrice(): Promise<bigint> {
	if (process.env.NEXT_PUBLIC_MOCK_ETHER) {
		return BigInt(parseFloat(process.env.NEXT_PUBLIC_MOCK_ETHER_PRICE ?? '0'))
	}

	await initContract()

	let currentPrice: bigint
	try {
		currentPrice = (await contract.currentPrice()) as bigint
	} catch (err) {
		console.error('Failed to get current price.', err)
		currentPrice = 0n
	}

	return currentPrice
}

async function getDistanceToDeath(price: bigint): Promise<number> {
	if (process.env.NEXT_PUBLIC_MOCK_ETHER) {
		return 28
	}

	const mints = (await fetch(`/api/mints`).then((response) =>
		response.json()
	)) as Row[]

	const distanceDone = mints.reduce<number>((acc: number, current: Row) => {
		return acc + Number(formatUnits(current.mintprice ?? 0n, 'ether'))
	}, 0)

	const distanceCurrent = Number(formatUnits(price, 'ether'))

	return 33 - distanceDone - distanceCurrent
}

async function getLastMinted(): Promise<LastMinted | undefined> {
	if (process.env.NEXT_PUBLIC_MOCK_ETHER) {
		return {
			mintPrice: 500000n,
			fullName: '1_clown_hospital_chair',
			mintDate: new Date('2024-10-01 21:55:17'),
			buyerAddress: '0x6F49498A063d4AB25106aD49c1f050088633268f',
			openSea:
				'https://opensea.io/assets/matic/0x251be3a17af4892035c37ebf5890f4a4d889dcad/71963690523115271825980614777540498807129498027807337614090170855822999748645',
		}
	}

	const mints = (await fetch(`/api/mints`).then((response) =>
		response.json()
	)) as Row[]

	const lastMintedRow = mints
		.sort((a, b) => (new Date(a.mintdate) < new Date(b.mintdate) ? -1 : 1))
		.findLast((row) => row.jobState === 'done')

	if (!lastMintedRow) return undefined

	return {
		mintPrice: lastMintedRow.mintprice ?? 0n,
		fullName: '1_clown_hospital_chair',
		mintDate: new Date(lastMintedRow.mintdate),
		buyerAddress: lastMintedRow.buyerAddress ?? '',
		openSea: lastMintedRow.openSea ?? '',
	}
}

async function getCountdown(): Promise<number> {
	if (process.env.NEXT_PUBLIC_MOCK_ETHER) {
		return 123
	}

	let countdown = 0
	try {
		// TODO: use contract.remainingTimeUntilPriceReset as soon as fixed
		countdown = await Promise.resolve(0)
		// countdown = Number(
		// 	(await contract.remainingTimeUntilPriceReset()) as bigint
		// )
	} catch (err) {
		console.error('Failed to get countdown.', err)
	}

	return countdown
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
