// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { processGlb } from 'gltf-pipeline'
import glob from 'glob'
import { readFile, writeFile } from 'fs/promises'

glob('./public/NewFallExamples/*.glb', (err, files) => {
	if (err) throw err

	files
		.filter((file) => !file.includes('.draco'))
		.forEach(async (file, i) => {
			const iPadded = (i + 1 + '').padStart(2, '0')
			const gltf = await readFile(file)
			const options = {
				resourceDirectory: `./public/NewFallExamples/${iPadded}/`,
				dracoOptions: {
					quantizeTexcoordBits: 0,
					compressionLevel: 10,
				},
				binary: true,
			}
			const result = await processGlb(gltf, options)
			await writeFile(
				`./public/NewFallExamples/${iPadded}.draco.glb`,
				result.glb,
				{
					encoding: 'utf8',
				}
			)
		})
})
