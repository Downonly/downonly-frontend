import { Row } from '@/components/player/types'
import { getDBDump } from '@/services/dbDump'

export interface AuctionInfoPostmint {
	mints: Row[]
	stage: 'postmint'
	price?: bigint
}

export type AuctionInfo = AuctionInfoPostmint

export function getAuctionInfo(): AuctionInfo {
	const mints = getDBDump()
	return {
		stage: 'postmint',
		mints,
	} satisfies AuctionInfoPostmint
}
