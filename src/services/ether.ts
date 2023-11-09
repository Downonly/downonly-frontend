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
	parseUnits,
	TransactionResponse,
} from 'ethers'

declare const window: Window &
	typeof globalThis & {
		ethereum: Eip1193Provider
	}

type MyContract = BaseContract & Omit<ContractInterface, keyof BaseContract>

const contractAddress = '0x7306d039Ab052AABAac0C94F27778cf2D55476F4'
let signer: JsonRpcSigner
let provider: JsonRpcApiProvider
let contract: MyContract

async function initContract() {
	if (contract) return

	if (!window.ethereum) {
		// If MetaMask is not installed, we use the default provider,
		// which is backed by a variety of third-party services (such
		// as INFURA). They do not have private keys installed and
		// only have read-only access.
		provider = getDefaultProvider('goerli') as JsonRpcApiProvider

		// Alternatively we can use the InfuraProvider.
		// provider = new InfuraProvider('goerli', 'b782095ddbde41128ce524c730e2a506')
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

	const abi = [
		{
			inputs: [],
			name: 'deposit',
			outputs: [],
			stateMutability: 'payable',
			type: 'function',
		},
		{
			inputs: [],
			name: 'getBalance',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
	]
	contract = new Contract(contractAddress, abi, signer || provider)
}

export async function getPrice() {
	await initContract()

	const balance = (await contract.getBalance()) as number
	const balanceEther = formatEther(balance)

	console.info('balance', balance)
	console.info('balanceEther', `${balanceEther} Ether`)

	return 4.7
}

export async function deposit(wei: number) {
	await initContract()

	// TODO: If we have no signer. Tell the user to first install a wallet.

	try {
		const contractWithSigner = contract.connect(signer)

		await contract.deposit()

		// Call the deposit function on the contract
		const depositTx = (await (contractWithSigner as MyContract).deposit({
			value: parseUnits(wei.toString(), -18),
		})) as TransactionResponse

		// Wait for the transaction to be mined
		await depositTx.wait()

		console.log('Deposit successful!')
	} catch (err) {
		console.error('Deposit failed:', err)
	}
}
