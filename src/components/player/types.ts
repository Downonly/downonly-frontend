import { type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export interface Row {
	id: string | number
	jobState: 'paid' | 'minting' | 'done'
	surface: string
	surfaceSmiley: string
	obstacle: string
	obstacleSmiley: string
	figure: string
	figureSmiley: string
	openSea: string | undefined
	ipfsMP3: string | undefined
	ipfsJPG: string | undefined
	ipfsMP4: string | undefined
	ipfsGLB: string | undefined
	mintprice: number | undefined
	fullname: string
	mintdate: string
	buyerAddress: string | undefined
	buytxHash: string | undefined
	blockHeight: number
}

export interface Take extends Omit<Row, 'ipfsMP3' | 'ipfsGLB' | 'mintdate'> {
	model?: GLTF | null
	modelURL: string
	sound?: Howl | null
	soundURL: string
	mintDate: Date
}
