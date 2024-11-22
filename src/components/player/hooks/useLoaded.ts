import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useMap } from 'usehooks-ts'
import { Howl } from 'howler'
import { useEffect, useRef } from 'react'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { Take } from '@/components/player/types'
import {
	FrontSide,
	LoadingManager,
	Material,
	Mesh,
	MeshStandardMaterial,
	NearestFilter,
} from 'three'
import config from '../../../../next.config'

const loadingManager = new LoadingManager()

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath(`${config.basePath}/draco/`)

const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)

export const useLoaded = (
	currentIndex: number,
	takes: Take[] | undefined,
	getNextTakes: () => Take[],
	bufferSize: number
) => {
	const [loaded, { set: setLoaded, remove: removeLoaded }] = useMap<
		string,
		{ gltf: GLTF; sound: Howl }
	>()
	const loadedRef = useRef<typeof loaded>()

	useEffect(() => {
		loadedRef.current = loaded
	}, [loaded])

	useEffect(() => {
		if (!takes?.length) return

		const takesToPreload = takes.slice(currentIndex, currentIndex + bufferSize)
		if (takesToPreload.length < bufferSize) {
			takesToPreload.push(...takes.slice(0, bufferSize - takesToPreload.length))
		}
		takesToPreload.forEach((take) => {
			const sound = new Howl({
				src: [take.soundURL],
				format: 'mp3',
				loop: true,
			})

			gltfLoader.load(take.modelURL, (gltf: GLTF) => {
				gltf.scene.traverse((child) => {
					child.frustumCulled = false
					// Improve performance of textures.
					if (child instanceof Mesh) {
						if (child.material instanceof Material) {
							child.material.side = FrontSide
						}

						if (child.material instanceof MeshStandardMaterial) {
							if (child.material.map) {
								child.material.map.generateMipmaps = false
								child.material.map.minFilter = NearestFilter
							}
						}

						// if (child.material instanceof ShaderMaterial) {
						// 	child.material.precision = 'lowp'
						// }
					}
				})
				if (!loadedRef.current!.has(take.modelURL)) {
					setLoaded(take.modelURL, { gltf, sound })
				}
			})
		})
	}, [setLoaded, currentIndex, takes, bufferSize])

	useEffect(() => {
		if (!takes?.length) return
		const nextTakes = getNextTakes()

		// Dispose all loaded that are not listed as next.
		Array.from(loaded.keys()).forEach((modelURL) => {
			if (modelURL === takes[currentIndex].modelURL) return
			if (!nextTakes.some((nextTake) => nextTake.modelURL === modelURL)) {
				const scene = loaded.get(modelURL)?.gltf.scene
				scene?.traverse((child) => {
					if (child instanceof Mesh) {
						const mesh = child as Mesh
						mesh.geometry?.dispose()
						if (Array.isArray(mesh.material)) {
							mesh.material.forEach((m) => m.dispose())
						} else {
							mesh.material.dispose()
						}
					}
				})
				scene?.removeFromParent()
				scene?.clear()
				const sound = loaded.get(modelURL)?.sound
				sound?.unload()
				removeLoaded(modelURL)
				const toDispose = takes.find((take) => take.modelURL === modelURL)
				if (toDispose) toDispose.model = null
			}
		})
	}, [currentIndex, getNextTakes, loaded, removeLoaded, takes])

	return loaded
}
