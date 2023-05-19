// min and max included
const randBetween = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1) + min)
const getCornerX = () => randBetween(2, 4)
const getCornerY = () => randBetween(14, 18)

export function getRoundedRectPathD(svgSize = 100, strokeWidth?: number) {
	if (strokeWidth === undefined) strokeWidth = Math.round(svgSize / 4)
	const topLeftLeftX = Math.round(strokeWidth + Math.random())
	const topLeftLeftY = Math.round(strokeWidth + Math.random())
	const topTopLeftX = topLeftLeftX + getCornerX()
	const topTopLeftY = topLeftLeftY - getCornerY()
	const topRightRightX = Math.round(svgSize - Math.random() - strokeWidth)
	const topRightRightY = Math.round(strokeWidth + Math.random())
	const topTopRightX = topRightRightX - getCornerX()
	const topTopRightY = topRightRightY - getCornerY()
	const bottomRightRightX = Math.round(svgSize - Math.random() - strokeWidth)
	const bottomRightRightY = Math.round(svgSize - Math.random() - strokeWidth)
	const bottomBottomRightX = bottomRightRightX - getCornerX()
	const bottomBottomRightY = bottomRightRightY + getCornerY()
	const bottomLeftLeftX = Math.round(strokeWidth + Math.random())
	const bottomLeftLeftY = Math.round(svgSize - Math.random() - strokeWidth)
	const bottomBottomLeftX = bottomLeftLeftX + getCornerX()
	const bottomBottomLeftY = bottomLeftLeftY + getCornerY()
	return `M ${topLeftLeftX} ${topLeftLeftY} L ${topTopLeftX} ${topTopLeftY} L ${topTopRightX} ${topTopRightY} L ${topRightRightX} ${topRightRightY} L ${bottomRightRightX} ${bottomRightRightY} L ${bottomBottomRightX} ${bottomBottomRightY} L ${bottomBottomLeftX} ${bottomBottomLeftY} L ${bottomLeftLeftX} ${bottomLeftLeftY} Z`
}
