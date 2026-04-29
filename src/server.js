const { execSync } = require('child_process');
const { randomUUID } = require('crypto');
const express = require('express');
const tasksRouter = require('./routes/tasks');
const { version } = require('../package.json');

let commit = 'unknown';
try {
  commit = execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
    .toString()
    .trim();
} catch {}

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>task-tracker-api</title>
  <style>
    :root { color-scheme: light dark; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      max-width: 720px;
      margin: 0 auto;
      padding: 3rem 1.5rem;
      line-height: 1.6;
    }
    h1 { margin-bottom: 0.25rem; }
    .tag { color: #888; font-size: 0.95rem; margin-bottom: 2rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { text-align: left; padding: 0.5rem 0.75rem; border-bottom: 1px solid #8884; }
    th { font-weight: 600; }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      background: #8881;
      padding: 0.1rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
    }
    .method {
      display: inline-block;
      min-width: 3.5rem;
      text-align: center;
      font-weight: 600;
      font-size: 0.8rem;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      background: #8882;
    }
    footer { margin-top: 3rem; color: #888; font-size: 0.85rem; }
  </style>
</head>
<body>
  <h1>task-tracker-api</h1>
  <p class="tag">A small REST API for tracking tasks.</p>

  <h2>Endpoints</h2>
  <table>
    <thead><tr><th>Method</th><th>Path</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><span class="method">GET</span></td><td><code>/health</code></td><td>Health check</td></tr>
      <tr><td><span class="method">GET</span></td><td><code>/version</code></td><td>Version, commit, and uptime</td></tr>
      <tr><td><span class="method">GET</span></td><td><code>/random</code></td><td>Returns random values</td></tr>
      <tr><td><span class="method">GET</span></td><td><code>/tasks</code></td><td>List all tasks</td></tr>
      <tr><td><span class="method">GET</span></td><td><code>/tasks/:id</code></td><td>Get a task</td></tr>
      <tr><td><span class="method">POST</span></td><td><code>/tasks</code></td><td>Create a task</td></tr>
      <tr><td><span class="method">PATCH</span></td><td><code>/tasks/:id</code></td><td>Update a task</td></tr>
      <tr><td><span class="method">DELETE</span></td><td><code>/tasks/:id</code></td><td>Delete a task</td></tr>
    </tbody>
  </table>

  <footer>Deployed via GitHub Actions.</footer>
</body>
</html>`);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/version', (req, res) => {
  res.json({ version, commit, uptime: process.uptime() });
});

app.get('/random', (req, res) => {
  res.json({
    uuid: randomUUID(),
    number: Math.floor(Math.random() * 1_000_000),
    dice: Math.floor(Math.random() * 6) + 1,
  });
});

app.use('/tasks', tasksRouter);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`task-tracker-api listening on port ${PORT}`);
  });
}

module.exports = app;
