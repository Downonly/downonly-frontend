import { useEffect, useState } from 'react'
import { Row, Take } from '@/components/player/types'

let result: Promise<Take[]>

export const useTakes = () => {
	const [takes, setTakes] = useState<Take[]>()

	useEffect(() => {
		setTakes([])

		if (process.env.NEXT_PUBLIC_PLAYER_DISABLED) return

		if (process.env.NEXT_PUBLIC_MOCK_MINTS) {
			result =
				result ??
				import('../mockData').then((module) => {
					return module
						.getMockData()
						.filter((row) => row.ipfsGLB && row.ipfsMP3)
						.map<Take>((row) => {
							const { ipfsGLB, ipfsMP3, mintdate, ...rest } = row
							return {
								modelURL: ipfsGLB,
								soundURL: ipfsMP3,
								mintDate: new Date(mintdate),
								...rest,
							} as Take
						})
				})
		} else {
			result =
				result ??
				fetch(`/api/mints`)
					.then((response) => response.json())
					.then((data: Row[]) => {
						return data
							.filter((row) => row.ipfsGLB && row.ipfsMP3)
							.map<Take>((row) => {
								const { ipfsGLB, ipfsMP3, mintdate, mintprice, ...rest } = row
								return {
									modelURL: ipfsGLB!,
									soundURL: ipfsMP3!,
									mintDate: new Date(mintdate),
									mintprice,
									...rest,
								}
							})
					})
		}

		result
			.then((takes) => {
				setTakes(takes)
			})
			.catch((err) => {
				console.error(err)
			})
	}, [])

	return takes
}
