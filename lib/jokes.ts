import jokes from '../source/jokes.json';

export interface Joke {
	id: number;
	type: string;
	setup: string;
	punchline: string;
}

const randomJoke = (): Joke => {
	return jokes[Math.floor(Math.random() * jokes.length)];
};

/**
 * Get N number of random jokes from a jokeArray.
 * Returns a unique selection and safely handles invalid counts.
 */
const randomN = (jokeArray: Joke[], n: number): Joke[] => {
	if (!Array.isArray(jokeArray) || jokeArray.length === 0) {
		return [];
	}

	const count = Number.isInteger(n) && n > 0 ? n : 1;
	const limit = Math.min(jokeArray.length, count);

	if (limit === jokeArray.length) {
		return [...jokeArray];
	}

	const randomIndices = new Set<number>();

	while (randomIndices.size < limit) {
		const randomIndex = Math.floor(Math.random() * jokeArray.length);
		randomIndices.add(randomIndex);
	}

	return Array.from(randomIndices, (randomIndex) => jokeArray[randomIndex]);
};

const randomTen = (): Joke[] => randomN(jokes, 10);
const randomNum = (num: number): Joke[] => randomN(jokes, Math.max(1, Number(num) || 1));
const jokeByType = (type: string, n: number): Joke[] => {
	const normalizedType = type.toLowerCase();
	return randomN(
		jokes.filter((joke) => joke.type.toLowerCase() === normalizedType),
		n,
	);
};

export { jokes, randomJoke, randomTen, randomNum, jokeByType };
