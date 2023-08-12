import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function Model() {
	const model = useLoader(
		GLTFLoader,
		// '/QmVHsPUUoxmWvP4yogUf9GnnKXoPMjBVRsipyzLUYEvEPc'
		'/WireframeTestFall_230718.glb'
	)

	return <primitive object={model.scene} />
}
