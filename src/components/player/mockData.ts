import { Row } from '@/components/player/types'

export const getMockData = () => {
	const data: Row[] = []
	const total = 23
	for (let i = 0; i < total; i++) {
		const numStr = (i + 1 + '').padStart(2, '0')

		let jobState: Row['jobState']
		if (i < 5) {
			jobState = 'done' // already finished transaction
		} else if (i === 5) {
			jobState = 'minting'
		} else {
			jobState = 'paid'
		}

		const done = jobState === 'done' || undefined
		// const paid = jobState === 'paid' || undefined
		// const minting = jobState === 'minting' || undefined

		data.push({
			id: i + 1,
			jobState,
			surface: 'cruise',
			obstacle: 'books',
			figure: 'chef',
			ipfsMP3: done && `/bf_toWeb_Exports/bf${numStr}/bf${numStr}.mp3`,
			ipfsGLB: done && `/bf_toWeb_Exports/bf${numStr}/bf${numStr}.draco.glb`,
			ipfsJPG: undefined,
			ipfsMP4: undefined,
			openSea:
				done &&
				'https://testnets.opensea.io/assets/goerli/0x410a2a13c7847321d66cae97c0b2b70706f1f483/5',
			fullname: 'COP-HOSPITAL-CHAIR-FALL',
			mintprice: done && Math.random(),
			blockHeight: 10035551,
			buyerAddress: done && '0x6F49498A063d4AB25106aD49c1f050088633268f',
			buytxHash:
				'0xf05b5ab0c5a900556c3333458eeb2991d91339f084fd77c6ddd63860cc9c51bc',
			mintdate: '2023-01-15T13:45:30.000Z',
		})
	}
	return data
}
