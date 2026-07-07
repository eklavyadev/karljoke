const fs = require('fs');
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const LimitingMiddleware = require('limiting-middleware');
const { randomJoke, randomTen, jokeByType, randomNum } = require('./handler');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    req.url = req.url.replace(/^\/api/, '') || '/';
  }
  next();
});

app.get('/', function (req, res) {
  return res.type('html').send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="KarlJoke - free dad jokes API" />
    <title>KarlJoke - Free DadJokes API</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" />
    <style>
      :root { color-scheme: light; }
      body { font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: linear-gradient(135deg, #fffdf5 0%, #f8f9fa 100%); min-height: 100vh; }
      .card-shell { max-width: 860px; margin: 3rem auto; border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 20px; box-shadow: 0 18px 45px rgba(0, 0, 0, 0.08); background: white; }
      .btn-loading { min-width: 120px; }
      pre { white-space: pre-wrap; word-break: break-word; }
      .github-btn { text-decoration: none; }
    </style>
  </head>
  <body>
    <div class="container py-5">
      <div class="card-shell p-4 p-md-5">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
          <div>
            <h1 class="display-5 fw-bold mb-2">KarlJoke</h1>
            <p class="lead text-muted mb-0">Free, open-source dad jokes API for your next project.</p>
          </div>
          <a id="githubStarBtn" class="github-btn btn btn-outline-dark" href="https://github.com/eklavyadev/karljoke" target="_blank" rel="noreferrer">
            <span class="me-2">⭐</span>
            <span>Star on GitHub</span>
          </a>
        </div>

        <div class="row g-4">
          <div class="col-lg-7">
            <h2 class="h4 mb-3">Try the demo</h2>
            <p class="text-muted">Click the button below to fetch a random joke from the API.</p>
            <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
              <button id="runBtn" class="btn btn-success btn-loading" type="button">Run</button>
              <span class="text-muted small">Endpoint: /jokes/random</span>
            </div>
            <pre id="resultBox" class="border rounded p-3 bg-light text-dark">{}</pre>
          </div>
          <div class="col-lg-5">
            <h2 class="h4 mb-3">Quick endpoints</h2>
            <ul class="list-group list-group-flush">
              <li class="list-group-item px-0">GET /jokes/random</li>
              <li class="list-group-item px-0">GET /jokes/ten</li>
              <li class="list-group-item px-0">GET /jokes/:type/random</li>
              <li class="list-group-item px-0">GET /jokes/:type/:number</li>
            </ul>
            <p class="mt-3 mb-0 text-muted">Want to contribute? Open a pull request on GitHub.</p>
          </div>
        </div>
      </div>
    </div>

    <script>
      const runBtn = document.getElementById('runBtn');
      const resultBox = document.getElementById('resultBox');
      const githubStarBtn = document.getElementById('githubStarBtn');

      async function loadStarCount() {
        try {
          const response = await fetch('https://api.github.com/repos/eklavyadev/karljoke');
          if (!response.ok) throw new Error('Unable to fetch stars');
          const data = await response.json();
          const starCount = typeof data.stargazers_count === 'number' ? data.stargazers_count : '—';
          githubStarBtn.innerHTML = '<span class="me-2">⭐</span><span>Star on GitHub · ' + starCount + '</span>';
        } catch (error) {
          githubStarBtn.innerHTML = '<span class="me-2">⭐</span><span>Star on GitHub</span>';
        }
      }

      async function runDemo() {
        runBtn.disabled = true;
        runBtn.textContent = 'Loading...';
        resultBox.textContent = 'Loading joke...';

        try {
          const response = await fetch('/api/jokes/random');
          if (!response.ok) throw new Error('Request failed');
          const joke = await response.json();
          resultBox.textContent = JSON.stringify(joke, null, 2);
        } catch (error) {
          resultBox.textContent = 'Something went wrong while fetching a joke.';
        } finally {
          runBtn.disabled = false;
          runBtn.textContent = 'Run';
        }
      }

      runBtn.addEventListener('click', runDemo);
      loadStarCount();
    </script>
  </body>
</html>`);
});

app.use(new LimitingMiddleware().limitByIp());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/jokes/random', (req, res) => {
  res.json(randomJoke());
});

app.get('/jokes/ten', (req, res) => {
  res.json(randomTen());
});

app.get('/jokes/:id', (req, res) => {
  const number = parseInt(req.params.id);
  res.json(randomNum(number));
});

app.get('/jokes/:type/random', (req, res) => {
  res.json(jokeByType(req.params.type, 1));
});

app.get('/jokes/:type/ten', (req, res) => {
  res.json(jokeByType(req.params.type, 10));
});

app.get('/jokes/:type/:num', (req, res) => {
  res.json(jokeByType(req.params.type, parseInt(req.params.num)));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: 'error', message: err.message
  });
});

module.exports = serverless(app);

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`listening on ${PORT}`));
}
