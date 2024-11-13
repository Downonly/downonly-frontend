const entries: [string, string][] = [
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
]
const lowerCaseEntries = entries.reduce<[string, string][]>((acc, curr) => {
	if (curr[0] !== curr[0].toLowerCase()) {
		return [...acc, [curr[0].toLowerCase(), curr[1]]]
	}
	return acc
}, [])

export const emojiNameMap = new Map<string, string>(entries)
export const emojiLowerCaseNameMap = new Map<string, string>(lowerCaseEntries)

export const nameEmojiMap = new Map<string, string>(
	Array.from(emojiNameMap.entries()).map(([key, value]) => [value, key])
)

export const getEmoji = (anyCaseName: string): string => {
	return (
		emojiNameMap.get(anyCaseName) ??
		emojiLowerCaseNameMap.get(anyCaseName.toLowerCase()) ??
		'❔'
	)
}
