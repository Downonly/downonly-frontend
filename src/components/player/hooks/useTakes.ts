import { useEffect, useState } from 'react'
import { Row, Take } from '@/components/player/types'

export const useTakes = () => {
	const [takes, setTakes] = useState<Take[]>()

	useEffect(() => {
		setTakes([])

		if (process.env.NEXT_PUBLIC_PLAYER_DISABLED) return

		if (process.env.NEXT_PUBLIC_MOCK_MINTS) {
			import('../mockData')
				.then((module) => {
					setTakes(
						module
							.getMockData()
							.filter((row) => row.ipfsVideo && row.ipfsSound)
							.map<Take>((row) => {
								const { ipfsVideo, ipfsSound, mintdate, ...rest } = row
								return {
									modelURL: ipfsVideo,
									soundURL: ipfsSound,
									mintDate: new Date(mintdate),
									...rest,
								} as Take
							})
					)
				})
				.catch((err) => {
					console.error(err)
				})
			return
		}

		fetch(`/api/mints`, { cache: 'force-cache' })
			.then((response) => response.json())
			.then((data: Row[]) => {
				setTakes(
					data
						.filter((row) => row.ipfsVideo && row.ipfsSound)
						.map<Take>((row) => {
							const { ipfsVideo, ipfsSound, mintdate, ...rest } = row
							return {
								modelURL: ipfsVideo!,
								soundURL: ipfsSound!,
								mintDate: new Date(mintdate),
								...rest,
							}
						})
				)
			})
			.catch((err) => {
				console.error(err)
			})
	}, [])

	return takes
}
