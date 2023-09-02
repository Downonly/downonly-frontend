import { randBetweenDeterm } from '@/utils/random'

export function roundedRectClipPath(cornerSize = 40, salt: string) {
	const csy = cornerSize
	const csx = csy * 0.5
	const randLX = () => randBetweenDeterm(csx * 0.75, csx, salt)
	const randMX = () => randBetweenDeterm(csx * 0.3, csx * 0.4, salt)
	const randSX = () => randBetweenDeterm(1, csx * 0.1, salt)
	const randLY = () => randBetweenDeterm(csx * 0.75, csx, salt)
	const randMY = () => randBetweenDeterm(csx * 0.3, csx * 0.4, salt)
	const randSY = () => randBetweenDeterm(1, csx * 0.1, salt)

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
