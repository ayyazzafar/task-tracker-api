const express = require('express');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Task Tracker API' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/tasks', tasksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`task-tracker-api listening on port ${PORT}`);
});

module.exports = app;
