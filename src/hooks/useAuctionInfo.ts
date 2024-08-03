import { useEffect, useState } from 'react'
import { type AuctionInfo, getAuctionInfo } from '@/services/ether'

export default function useAuctionInfo() {
	const [auctionInfo, setAuctionInfo] = useState<AuctionInfo>()

	useEffect(() => {
		getAuctionInfo()
			.then(setAuctionInfo)
			.catch((err) => {
				console.error(err)
			})
	}, [])

	return auctionInfo
}
