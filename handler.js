const jokes = require('./source/jokes.json');

const randomJoke = () => jokes[Math.floor(Math.random() * jokes.length)];

/**
 * Get N number of random jokes from a jokeArray.
 * Returns a unique selection and safely handles invalid counts.
 */
const randomN = (jokeArray, n) => {
  if (!Array.isArray(jokeArray) || jokeArray.length === 0) {
    return [];
  }

  const count = Number.isInteger(n) && n > 0 ? n : 1;
  const limit = Math.min(jokeArray.length, count);

  if (limit === jokeArray.length) {
    return [...jokeArray];
  }

  const randomIndices = new Set();

  while (randomIndices.size < limit) {
    const randomIndex = Math.floor(Math.random() * jokeArray.length);
    randomIndices.add(randomIndex);
  }

  return Array.from(randomIndices, (randomIndex) => jokeArray[randomIndex]);
};

const randomTen = () => randomN(jokes, 10);
const randomNum = (num) => randomN(jokes, Math.max(1, Number(num) || 1));
const jokeByType = (type, n) => {
  const normalizedType = typeof type === 'string' ? type.toLowerCase() : '';
  const filtered = jokes.filter((joke) => joke.type.toLowerCase() === normalizedType);

  return randomN(filtered, n);
};

module.exports = { jokes, randomNum, randomJoke, randomN, randomTen, jokeByType };
