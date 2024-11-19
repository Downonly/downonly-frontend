export class NoWalletError extends Error {
	constructor(...args: Parameters<typeof Error>) {
		super(...args)
	}
}

export class InsufficientFundsError extends Error {
	constructor(...args: Parameters<typeof Error>) {
		super(...args)
	}
}

export class AlreadyProcessingError extends Error {
	constructor(...args: Parameters<typeof Error>) {
		super(...args)
	}
}
