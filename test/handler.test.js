const test = require('node:test');
const assert = require('node:assert/strict');
const { randomN, jokeByType } = require('../handler');

test('jokeByType matches types case-insensitively', () => {
  const result = jokeByType('Programming', 2);

  assert.equal(result.length, 2);
  assert.ok(result.every((joke) => joke.type.toLowerCase() === 'programming'));
});

test('randomN returns unique jokes without exceeding the requested amount', () => {
  const jokes = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const result = randomN(jokes, 2);

  assert.equal(result.length, 2);
  assert.equal(new Set(result.map((joke) => joke.id)).size, 2);
});
