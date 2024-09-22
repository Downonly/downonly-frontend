import { type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export interface Row {
	id: string | number
	jobState: 'paid' | 'minting' | 'done'
	surface: string
	obstacle: string
	figure: string
	ipfsVideo: string | undefined
	openSea: string | undefined
	ipfsSound: string | undefined
	fullname: string
	mintdate: string
	mintprice: number | undefined
	blockHeight: number
	buytxHash: string | undefined
	buyerAddress: string | undefined
}

export interface Take
	extends Omit<Row, 'ipfsSound' | 'ipfsVideo' | 'mintdate'> {
	model?: GLTF | null
	modelURL: string
	sound?: Howl | null
	soundURL: string
	mintDate: Date
}
