import { Row } from '@/components/player/types'

export const getMockData = () => {
	const data: Row[] = []
	for (let i = 0; i < 23; i++) {
		const numStr = (i + 1 + '').padStart(2, '0')

		data.push({
			id: i + 1,
			jobState: 'done',
			surface: '547',
			obstacle: 'wc1',
			figure: 'rk2',
			ipfsVideo: `/bf_toWeb_Exports/bf${numStr}/bf${numStr}.draco.glb`,
			openSea:
				'https://testnets.opensea.io/assets/goerli/0x410a2a13c7847321d66cae97c0b2b70706f1f483/5',
			ipfsSound: `/bf_toWeb_Exports/bf${numStr}/bf${numStr}.mp3`,
			fullname: 'COP-HOSPITAL-CHAIR-FALL',
			mintdate: '2023-01-15T13:45:30.000Z',
		})
	}
	return data
}
