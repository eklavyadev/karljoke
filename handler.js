const jokes = require('./source/jokes.json');

const randomJoke = () => {
  return jokes[Math.floor(Math.random() * jokes.length)];
}

/**
 * Get N number of random jokes from a jokeArray
 */
const randomN = (jokeArray, n) => {
  const limit = jokeArray.length < n ? jokeArray.length : n;
  const randomIndicesSet = new Set();

  while (randomIndicesSet.size < limit) {
    const randomIndex = Math.floor(Math.random() * jokeArray.length);
    if (!randomIndicesSet.has(randomIndex)) {
      randomIndicesSet.add(randomIndex);
    }
  }

  return Array.from(randomIndicesSet).map(randomIndex => {
    return jokeArray[randomIndex];
  });
};

const randomTen = () => randomN(jokes, 10);
// Get num number of jokes
const randomNum = (num) => randomN(jokes, num)
const jokeByType = (type, n) => {
  return randomN(jokes.filter(joke => joke.type === type), n);
};

module.exports = { jokes, randomNum ,randomJoke, randomN, randomTen, jokeByType };
