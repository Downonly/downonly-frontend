import { useEffect, useState } from 'react'
import { type AuctionInfo, getAuctionInfo } from '@/services/ether'

const pollInterval = Number(process.env.NEXT_PUBLIC_POLL_INTERVALL ?? 10_000)

const subscribers = new Map<string, (info: AuctionInfo) => void>()

const fetchAuctionInfo = () => {
	try {
		const info: AuctionInfo = getAuctionInfo()
		Array.from(subscribers.keys()).forEach((key) => {
			subscribers.get(key)?.(info)
		})
	} catch (err) {
		console.error('Failed to get auction info.', err)
	} finally {
		setTimeout(() => void fetchAuctionInfo(), pollInterval)
	}
}
fetchAuctionInfo()

export default function useAuctionInfo(key: string) {
	const [auctionInfo, setAuctionInfo] = useState<AuctionInfo>()

	useEffect(() => {
		subscribers.set(key, setAuctionInfo)

		return () => {
			subscribers.delete(key)
		}
	}, [key])

	return auctionInfo
}
