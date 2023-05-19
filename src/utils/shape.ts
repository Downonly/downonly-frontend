export function roundedRectClipPath(cornerSize = 30) {
	const csy = cornerSize
	const csx = csy * 0.5
	const randBetween = (min: number, max: number) =>
		Math.floor(Math.random() * (max - min + 1) + min) // min and max included
	const randLX = () => randBetween(csx * 0.75, csx)
	const randMX = () => randBetween(csx * 0.3, csx * 0.4)
	const randSX = () => randBetween(1, csx * 0.1)
	const randLY = () => randBetween(csx * 0.75, csx)
	const randMY = () => randBetween(csx * 0.3, csx * 0.4)
	const randSY = () => randBetween(1, csx * 0.1)

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
