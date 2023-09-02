export function randBetweenDeterm(min: number, max: number, salt: string) {
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

export function randBetween(min: number, max: number) {
	return Math.random() * (max - min) + min
}
