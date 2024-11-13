import {
	type BaseContract,
	BrowserProvider,
	Contract,
	type ContractInterface,
	type Eip1193Provider,
	formatUnits,
	type JsonRpcApiProvider,
	JsonRpcProvider,
	type JsonRpcSigner,
	TransactionResponse,
} from 'ethers'
import abi from './abi/dutchauction.json'
import { DepositError, InsufficientFundsError } from '@/errors/errorEther'
import { Row } from '@/components/player/types'
import { getEmoji } from '@/utils/emoji'

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

interface LastMinted {
	mintPrice: bigint
	fullName: string
	mintDate: Date
	buyerAddress: string
	openSea: string
	fallDistance: string
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

const avgBlockTime = Number(process.env.NEXT_PUBLIC_AVG_BLOCK_TIME)

// eslint-disable-next-line @typescript-eslint/require-await
async function initContract() {
	if (process.env.NEXT_PUBLIC_MOCK_ETHER) return

	if (contract) return

	if (typeof window === 'undefined') return

	provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_PROVIDER)

	try {
		const browserProvider = new BrowserProvider(window.ethereum)

		signer = await browserProvider.getSigner()
	} catch (err) {
		console.warn('No signer.', err)
	}

	contract = new Contract(contractAddress, abi, signer || provider)
}

export async function getAuctionInfo(): Promise<AuctionInfo> {
	const mockedAuctionStage = process.env.NEXT_PUBLIC_MOCK_AUCTION_STAGE as
		| AuctionStage
		| undefined
	if (mockedAuctionStage) {
		if (mockedAuctionStage === 'emergency') {
			return { stage: 'emergency' } satisfies AuctionInfoEmergency
		}

		const mints = (await import('./mockData')).getMockData()

		switch (mockedAuctionStage) {
			case 'premint': // auctionNotStarted
				return {
					stage: mockedAuctionStage,
					countdown: 123,
					mints,
				} satisfies AuctionInfoPremint
			case 'mint': // auctionActive
				return {
					stage: mockedAuctionStage,
					mints,
					countdown: 123,
					price: 123n,
					distanceCurrent: 0.123,
					distanceToDeath: 23,
				} satisfies AuctionInfoMint
			case 'inbetween-mint-push':
				return {
					stage: mockedAuctionStage,
					mints,
					price: 123n,
					distanceCurrent: 0.123,
					distanceToDeath: 23,
					lastMinted: {
						mintPrice: 123n,
						fullName: 'Yolo',
						mintDate: new Date(),
						buyerAddress: '0x6F49498A063d4AB25106aD49c1f050088633268f',
						openSea: 'https://testnets.opensea.io/assets/...',
						fallDistance: '23.4',
					},
				} satisfies AuctionInfoInbetweenMintPush
			case 'inbetween-mint-play': // getPhase ist cooldown und 1min vorbei
				return {
					stage: mockedAuctionStage,
					mints,
					countdown: 123,
					price: 123n,
					distanceCurrent: 0.123,
					distanceToDeath: 23,
					lastMinted: {
						mintPrice: 123n,
						fullName: 'Yolo',
						mintDate: new Date(),
						buyerAddress: '0x6F49498A063d4AB25106aD49c1f050088633268f',
						openSea: 'https://testnets.opensea.io/assets/...',
						fallDistance: '23.4',
					},
				} satisfies AuctionInfoInbetweenMintPlay
			case 'postmint': // auctionsEnded
				return {
					stage: mockedAuctionStage,
					mints,
				} satisfies AuctionInfoPostmint
		}
	}

	let mints: Row[] = []
	let pushing = false
	let res: Response | undefined = undefined
	try {
		res = await fetch(`${process.env.NEXT_PUBLIC_BASE}api/mints`)
		const json = (await res.json()) as {
			mints: Row[]
			pushing: boolean
		}
		mints = json.mints
		pushing = json.pushing
	} catch (err) {
		console.error('Failed to fetch mints from db.', err)
	}

	try {
		await initContract()

		if (!contract) {
			return {
				stage: 'premint',
				countdown: 0,
				mints: [],
			} satisfies AuctionInfoPremint
		}
	} catch (err) {
		console.error('Failed to init contract.', err)
		return {
			stage: 'premint',
			countdown: 0,
			mints: [],
		} satisfies AuctionInfoPremint
	}

	let phase: Phase | undefined = undefined
	try {
		phase = (await contract.getPhase()) as Phase
	} catch (err) {
		console.error('Failed to get phase.', err)
		return {
			stage: 'premint',
			countdown: 0,
			mints: [],
		} satisfies AuctionInfoPremint
	}

	if (phase === 'emergencyPause') {
		const info: AuctionInfoEmergency = {
			stage: 'emergency',
		}
		return info
	}

	let remainingLives: RemainingLives | undefined = undefined
	try {
		remainingLives = await getRemainingLives()
	} catch (err) {
		console.error('Failed to get remaining lives', err)
	}

	let lastMinted: LastMinted | undefined = undefined
	try {
		lastMinted = getLastMinted(mints)
	} catch (err) {
		console.error('Failed to get last minted', err)
	}

	if (pushing) {
		const price = lastMinted?.mintPrice ?? 0n
		const distanceToDeath = getDistanceToDeath(mints, price)
		const distanceCurrent = Number(formatUnits(price, 'ether'))

		const info: AuctionInfoInbetweenMintPush = {
			stage: 'inbetween-mint-push',
			remainingLives,
			price,
			distanceCurrent,
			distanceToDeath,
			mints,
		}
		return info
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
			countdown =
				Number((await contract.remainingTimeTillPauseEnds()) as bigint) *
				avgBlockTime
		} catch (err) {
			console.error('Failed to get countdown.', err)
		}

		if (mints.length === 0) {
			const info: AuctionInfoPremint = {
				stage: 'premint',
				countdown,
				mints,
			}
			return info
		}

		const price = await getCurrentPrice()
		const distanceToDeath = getDistanceToDeath(mints, price)
		const distanceCurrent = Number(formatUnits(price, 'ether'))

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
		const countdown =
			Number((await contract.remainingTimeTillPauseEnds()) as bigint) *
			avgBlockTime
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

	return {
		stage: 'premint',
		countdown: 0,
		mints: [],
	} satisfies AuctionInfoPremint
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
				const emoji = getEmoji(emojiName as string)
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
		fallDistance: lastMintedRow.fallDistance ?? '',
	}
}

async function getCountdown(): Promise<number> {
	if (process.env.NEXT_PUBLIC_MOCK_ETHER) {
		return 123
	}

	let countdown = 0
	try {
		const bigInt = (await contract.remainingTimeUntilPriceReset()) as bigint
		countdown = Number(bigInt) * avgBlockTime
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

export async function buy(
	wei: bigint,
	config: {
		setting: string
		character: string
		obstacle: string
	}
) {
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
			config.character,
			config.obstacle,
			config.setting,
			{
				value: wei,
			}
		)) as TransactionResponse

		// Wait for the transaction to be mined.
		await depositTx.wait()
	} catch (err) {
		if (err instanceof Error && err.message.includes('insufficient funds')) {
			throw new InsufficientFundsError('Deposit failed.', { cause: err })
		}
		throw new DepositError('Deposit failed.', { cause: err })
	}
}
