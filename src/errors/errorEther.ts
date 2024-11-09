export class DepositError extends Error {
	constructor(...args: Parameters<typeof Error>) {
		super(...args)
	}
}

export class InsufficientFundsError extends Error {
	constructor(...args: Parameters<typeof Error>) {
		super(...args)
	}
}
