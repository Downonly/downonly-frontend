/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Material, Mesh, MeshStandardMaterial } from 'three'

const disposeMaterial = (mtrl: Material) => {
	if (mtrl instanceof MeshStandardMaterial) {
		if ('map' in mtrl) {
			mtrl.map?.dispose()
		}
		if ('lightMap' in mtrl) {
			mtrl.lightMap?.dispose()
		}
		if ('bumpMap' in mtrl) {
			mtrl.bumpMap?.dispose()
		}
		if ('normalMap' in mtrl) {
			mtrl.normalMap?.dispose()
		}
		// if ('specularMap' in mtrl) {
		//   mtrl.specularMap?.dispose()
		// }
		if ('envMap' in mtrl) {
			mtrl.envMap?.dispose()
		}
		if ('alphaMap' in mtrl) {
			mtrl.alphaMap?.dispose()
		}
		if ('aoMap' in mtrl) {
			mtrl.aoMap?.dispose()
		}
		if ('displacementMap' in mtrl) {
			mtrl.displacementMap?.dispose()
		}
		if ('emissiveMap' in mtrl) {
			mtrl.emissiveMap?.dispose()
		}
		// if ('gradientMap' in mtrl) {
		//   mtrl.gradientMap?.dispose()
		// }
		if ('metalnessMap' in mtrl) {
			mtrl.metalnessMap?.dispose()
		}
		if ('roughnessMap' in mtrl) {
			mtrl.roughnessMap?.dispose()
		}
	}
	mtrl.dispose()
}

const disposeNode = (node: Mesh) => {
	if (node instanceof Mesh) {
		if (node.geometry) {
			node.geometry.dispose()
		}

		if (node.material) {
			if (Array.isArray(node.material)) {
				node.material.forEach((mtrl) => {
					disposeMaterial(mtrl)
				})
			} else {
				disposeMaterial(node.material)
			}
		}
	}
}

const disposeHierarchy = (node: Mesh, callback?: (node: Mesh) => void) => {
	for (let i = node.children.length; i--; ) {
		const child = node.children[i] as Mesh
		disposeHierarchy(child, callback)
		callback?.(child)
	}
}

export const dispose = (node: Mesh) => {
	disposeHierarchy(node, disposeNode)
}
