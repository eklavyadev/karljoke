const express = require('express');
const path = require('path');
const LimitingMiddleware = require('limiting-middleware');
const { randomJoke, randomTen, jokeByType, randomNum } = require('./handler');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(new LimitingMiddleware().limitByIp());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send('Available Public Endpoints\n/jokes/random\n/jokes/ten\n/jokes/{id}\n/jokes/{type}/random\n/jokes/{type}/{number}\n/jokes/{type}/{id}\nWant to contribute? Just create a PR on blablabla.com 😀');
});

app.get('/jokes/random', (req, res) => {
  res.json(randomJoke());
});

app.get('/jokes/ten', (req, res) => {
  res.json(randomTen());
});

app.get('/jokes/:id', (req, res) => {
    const number = parseInt(req.params.id)
    res.json(randomNum(number));
  });

app.get('/jokes/:type/random', (req, res) => {
  res.json(jokeByType(req.params.type, 1));
});

app.get('/jokes/:type/ten', (req, res) => {
  res.json(jokeByType(req.params.type, 10));
});

app.get('/jokes/:type/:id', (req, res) => {
    res.json(jokeByType(req.params.type, parseInt(req.params.id)));
  });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: 'error', message: err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));