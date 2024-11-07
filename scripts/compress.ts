// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { processGlb } from 'gltf-pipeline'
import glob from 'glob'
import { readFile, writeFile } from 'fs/promises'

glob('./public/NewFallExamples/*.glb', (err, files) => {
	if (err) throw err

	files
		.filter((file) => !file.includes('.draco'))
		.forEach((file, i) => {
			const iPadded = (i + 1 + '').padStart(2, '0')
			void readFile(file)
				.then((gltf) => {
					const options = {
						resourceDirectory: `./public/NewFallExamples/${iPadded}/`,
						dracoOptions: {
							// quantizeTexcoordBits: 0,
							compressionLevel: 10,
						},
						binary: true,
					}
					// eslint-disable-next-line @typescript-eslint/no-unsafe-call
					return processGlb(gltf, options) as Promise<{ glb: string }>
				})
				.then(({ glb }) => {
					return writeFile(
						`./public/NewFallExamples/${iPadded}.draco.glb`,
						glb,
						{
							encoding: 'utf8',
						}
					)
				})
		})
})
