export const emojiNameMap = new Map<string, string>([
	['antenna', '📡'],
	['livingRoom', '🛋️'],
	['windPark', '🌀'],
	['court', '🏛️'],
	['castle', '🏰'],
	['ferris', '🎡'],
	['scaffolding', '🚧'],
	['cruise', '🚢'],
	['snowPark', '🌨️'],
	['victoryColumn', '✌️'],
	['escalator', '🚇'],
	['business', '👔'],
	['astronaut', '🚀'],
	['knight', '🛡️'],
	['clown', '🎭'],
	['chef', '🍳'],
	['police', '🔫'],
	['ski', '🎿'],
	['construction', '🔨'],
	['farm', '🥕'],
	['bath', '🫧'],
	['judge', '⚖️'],
	['shoppingCart', '🛒'],
	['balloons', '🎈'],
	['satellite', '🛰️'],
	['toilet', '🚻'],
	['books', '📚'],
	['horse', '🐴'],
	['snowCannon', '❄️'],
	['piano', '🎹'],
	['stove', '🔥'],
	['money', '💵'],
	['transporter', '🚨'],
])

export const nameEmojiMap = new Map<string, string>(
	Array.from(emojiNameMap.entries()).map(([key, value]) => [value, key])
)

export const getEmoji = (anyCaseName: string): string => {
	return (
		emojiNameMap.get(anyCaseName) ??
		emojiNameMap.get(anyCaseName.toLowerCase()) ??
		'❔'
	)
}
