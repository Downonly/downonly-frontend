import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { LoopOnce } from 'three'
// import { LoopRepeat } from 'three'

export default function Model(props: { path: string }) {
	const { scene, animations } = useGLTF(
		// '/QmVHsPUUoxmWvP4yogUf9GnnKXoPMjBVRsipyzLUYEvEPc'
		props.path
	)
	const { mixer, actions } = useAnimations(animations, scene)
	const action = actions[0]

	useEffect(() => {
		const action = mixer.clipAction(animations[0])
		action.setLoop(LoopOnce, 0)
		// action.setEffectiveTimeScale(mixerSettings.actionTimeScale)
		action.play()
	}, [action, animations, mixer])

	return <primitive object={scene} />
}

// useGLTF.preload('/WireframeTestFall_230718.glb')
