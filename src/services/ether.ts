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
	| 'emergency'

type Phase =
	| 'auctionNotStarted'
	| 'auctionActive'
	| 'auctionCooldown'
	| 'auctionsEnded'
	| 'emergencyPause'

type RemainingLives = Map<string, number>

type RemainingLivesRawItem = string[] | number[]
type RemainingLivesRaw = RemainingLivesRawItem[]

interface AuctionInfoBase {
	stage: AuctionStage
	mints: Row[]
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
	countdown: number
}

export interface AuctionInfoInbetweenMintPlay extends AuctionInfoWithPrice {
	stage: 'inbetween-mint-play'
	countdown: number
}

export interface AuctionInfoPostmint extends AuctionInfoBase {
	stage: 'postmint'
	price?: bigint
	lastMinted?: LastMinted
}

export interface AuctionInfoEmergency {
	stage: 'emergency'
}

export type AuctionInfo =
	| AuctionInfoPremint
	| AuctionInfoMint
	| AuctionInfoInbetweenMintPush
	| AuctionInfoInbetweenMintPlay
	| AuctionInfoPostmint
	| AuctionInfoEmergency

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

// let lastMotorPushWithoutBuy: number | undefined
let lastInbetweenMintPushTime: number | undefined
export async function getAuctionInfo(): Promise<AuctionInfo> {
	const mockedAuctionStage = process.env.NEXT_PUBLIC_MOCK_AUCTION_STAGE as
		| AuctionStage
		| undefined
	if (mockedAuctionStage) {
		const mints = (await import('./mockData')).getMockData()

		switch (mockedAuctionStage) {
			case 'premint': // auctionNotStarted
				return {
					stage: mockedAuctionStage,
					mints,
				} as AuctionInfoPremint
			case 'mint': // auctionActive
				return {
					stage: mockedAuctionStage,
					mints,
				} as AuctionInfoMint
			case 'inbetween-mint-push': // (jobState wechselt zu done / getMotorPushWithoutBuy geht hoch) + ~1min // hier ist auch cooldown
				return {
					stage: mockedAuctionStage,
					mints,
				} as AuctionInfoInbetweenMintPush
			case 'inbetween-mint-play': // getPhase ist cooldown und 1min vorbei
				return {
					stage: mockedAuctionStage,
					mints,
				} as AuctionInfoInbetweenMintPlay
			case 'postmint': // auctionsEnded
				return {
					stage: mockedAuctionStage,
					mints,
				} as AuctionInfoPostmint
		}
	}

	// TODO: handle init contract failure.
	await initContract()

	const phase = (await contract.getPhase()) as Phase

	if (phase === 'emergencyPause') {
		const info: AuctionInfoEmergency = {
			stage: 'emergency',
		}
		return info
	}

	if (phase !== 'auctionCooldown') {
		lastInbetweenMintPushTime = undefined
	}

	let remainingLives: RemainingLives | undefined = undefined
	try {
		remainingLives = await getRemainingLives()
	} catch (err) {
		console.error('Failed to get remaining lives', err)
	}

	let mints: Row[] = []
	try {
		mints = (await fetch(`/api/mints`).then((response) =>
			response.json()
		)) as Row[]
	} catch (err) {
		console.error('Failed to fetch mints from db.', err)
	}

	let lastMinted: LastMinted | undefined = undefined
	try {
		lastMinted = getLastMinted(mints)
	} catch (err) {
		console.error('Failed to get last minted', err)
	}

	if (phase === 'auctionsEnded') {
		const info: AuctionInfoPostmint = {
			stage: 'postmint',
			price: await getCurrentPrice(),
			remainingLives,
			lastMinted,
			mints,
		}
		return info
	}

	if (phase === 'auctionCooldown') {
		let countdown = 0
		try {
			countdown = (await contract.getRemainingPause()) as number
		} catch (err) {
			console.error('Failed to get countdown.', err)
		}

		const price = await getCurrentPrice()
		const distanceToDeath = getDistanceToDeath(mints, price)
		const distanceCurrent = Number(formatUnits(price, 'ether'))

		if (lastInbetweenMintPushTime === undefined) {
			lastInbetweenMintPushTime = Number(new Date())
		}

		if (
			getJobState(mints) === 'done' &&
			Number(new Date()) - lastInbetweenMintPushTime < 60_000
		) {
			const info: AuctionInfoInbetweenMintPush = {
				stage: 'inbetween-mint-push',
				countdown,
				price,
				distanceCurrent,
				distanceToDeath,
				mints,
			}
			return info
		}

		const info: AuctionInfoInbetweenMintPlay = {
			stage: 'inbetween-mint-play',
			countdown,
			price,
			distanceCurrent,
			distanceToDeath,
			mints,
		}
		return info
	}

	if (phase === 'auctionNotStarted') {
		const countdown = Number(await contract.initialPause())
		const info: AuctionInfoPremint = {
			countdown,
			stage: 'premint',
			mints,
		}
		return info
	}

	if (phase === 'auctionActive') {
		const price = await getCurrentPrice()
		const distanceToDeath = getDistanceToDeath(mints, price)
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
			mints,
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

function getJobState(mints: Row[]): Row['jobState'] | undefined {
	return mints
		.sort((a, b) => (new Date(a.mintdate) < new Date(b.mintdate) ? -1 : 1))
		.findLast((row) => row.jobState === 'done' || row.jobState === 'minting')
		?.jobState
}

function getDistanceToDeath(mints: Row[], price: bigint): number {
	if (process.env.NEXT_PUBLIC_MOCK_ETHER) {
		return 28
	}

	const distanceDone = mints.reduce<number>((acc: number, current: Row) => {
		return acc + Number(formatUnits(current.mintprice ?? 0n, 'ether'))
	}, 0)

	const distanceCurrent = Number(formatUnits(price, 'ether'))

	return 33 - distanceDone - distanceCurrent
}

async function getRemainingLives(): Promise<RemainingLives> {
	const remainingLivesRaw =
		(await contract.getAllAssetsRemainingLives()) as RemainingLivesRaw
	const remainingLives = remainingLivesRaw.reduce<RemainingLives>(
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
	return remainingLives
}

function getLastMinted(mints: Row[]): LastMinted | undefined {
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
