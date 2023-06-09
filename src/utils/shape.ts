function randBetween(min: number, max: number, salt: string) {
	// Combine the parameters to create a unique seed
	const seed = `${min}-${max}-${salt}`

	// Generate a hash code from the seed using the djb2 algorithm
	let hash = 5381
	for (let i = 0; i < seed.length; i++) {
		hash = (hash * 33) ^ seed.charCodeAt(i)
	}

	// Use the hash code to generate a random number within the desired range
	const range = max - min + 1
	const randomNumber = (hash % range) + min
	return randomNumber
}

export function roundedRectClipPath(cornerSize = 40, salt: string) {
	const csy = cornerSize
	const csx = csy * 0.5
	const randLX = () => randBetween(csx * 0.75, csx, salt)
	const randMX = () => randBetween(csx * 0.3, csx * 0.4, salt)
	const randSX = () => randBetween(1, csx * 0.1, salt)
	const randLY = () => randBetween(csx * 0.75, csx, salt)
	const randMY = () => randBetween(csx * 0.3, csx * 0.4, salt)
	const randSY = () => randBetween(1, csx * 0.1, salt)

	//        x  <-- We start here and go clock wise and end here.
	//    x
	//   /
	//  x
	//  |
	//  |
	//  |
	//  x

	const start = { x: `${randLX()}px`, y: `${randSY()}px` }
	const points = [
		start,
		{ x: `calc(100% - ${randLX()}px)`, y: `${randSY()}px` },
		{ x: `calc(100% - ${randMX()}px)`, y: `${randMY()}px` },
		{ x: `calc(100% - ${randSX()}px)`, y: `${randLY()}px` },
		{ x: `calc(100% - ${randSX()}px)`, y: `calc(100% - ${randLY()}px)` },
		{ x: `calc(100% - ${randMX()}px)`, y: `calc(100% - ${randMY()}px)` },
		{ x: `calc(100% - ${randLX()}px)`, y: `calc(100% - ${randSY()}px)` },
		{ x: `${randLX()}px`, y: `calc(100% - ${randSY()}px)` },
		{ x: `${randMX()}px`, y: `calc(100% - ${randMY()}px)` },
		{ x: `${randSX()}px`, y: `calc(100% - ${randLY()}px)` },
		{ x: `${randSX()}px`, y: `${randLY()}px` },
		{ x: `${randMX()}px`, y: `${randMY()}px` },
		start,
	]
	return `polygon(${points.map((p) => p.x + ' ' + p.y).join(', ')})`
}
