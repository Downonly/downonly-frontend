import { type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export interface Row {
	id: string | number
	jobState: 'paid' | 'minting' | 'done' // there is no minting, only paid and done, everything elese is minting
	surface: string
	obstacle: string
	figure: string
	openSea: string | undefined
	ipfsMP3: string | undefined
	ipfsJPEG: string | undefined
	ipfsMP4: string | undefined
	ipfsGLB: string | undefined
	mintprice: bigint | undefined
	fullname: string
	mintdate: string
	buyerAddress: string | undefined
	buytxHash: string | undefined
	blockHeight: number
	fallDistance: string | undefined
}

export interface Take extends Omit<Row, 'ipfsMP3' | 'ipfsGLB' | 'mintdate'> {
	model?: GLTF | null
	modelURL: string
	sound?: Howl | null
	soundURL: string
	mintDate: Date
}
