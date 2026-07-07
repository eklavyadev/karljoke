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
 * Get N number of random jokes from a jokeArray
 */
const randomN = (jokeArray: Joke[], n: number): Joke[] => {
  const limit = jokeArray.length < n ? jokeArray.length : n;
  const randomIndicesSet = new Set<number>();

  while (randomIndicesSet.size < limit) {
    const randomIndex = Math.floor(Math.random() * jokeArray.length);
    if (!randomIndicesSet.has(randomIndex)) {
      randomIndicesSet.add(randomIndex);
    }
  }

  return Array.from(randomIndicesSet).map((randomIndex) => {
    return jokeArray[randomIndex];
  });
};

const randomTen = (): Joke[] => randomN(jokes, 10);
const randomNum = (num: number): Joke[] => randomN(jokes, num);
const jokeByType = (type: string, n: number): Joke[] => {
  return randomN(jokes.filter((joke) => joke.type === type), n);
};

export { jokes, randomJoke, randomTen, randomNum, jokeByType };
