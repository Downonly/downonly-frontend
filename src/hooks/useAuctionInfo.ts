import { useEffect, useState } from 'react'
import { type AuctionInfo, getAuctionInfo } from '@/services/ether'

const pollInterval = Number(process.env.NEXT_PUBLIC_POLL_INTERVALL ?? 10_000)

const subscribers = new Map<string, (info: AuctionInfo) => void>()

const fetchAuctionInfo = async () => {
	try {
		const info: AuctionInfo = await getAuctionInfo()
		Array.from(subscribers.keys()).forEach((key) => {
			subscribers.get(key)?.(info)
		})
	} catch (err) {
		console.error('Failed to get auction info.', err)
	} finally {
		setTimeout(() => void fetchAuctionInfo(), pollInterval)
	}
}
void fetchAuctionInfo()

export default function useAuctionInfo(key: string) {
	const [auctionInfo, setAuctionInfo] = useState<AuctionInfo>()

	useEffect(() => {
		if (subscribers.has(key)) {
			console.warn(`Subscriber with key ${key} already exists. Skipping`)
		} else {
			subscribers.set(key, setAuctionInfo)
		}

		return () => {
			subscribers.delete(key)
		}
	}, [key])

	return auctionInfo
}
