const express = require('express');
const store = require('../store');
const { validateTaskPayload } = require('../validate');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(store.listTasks());
});

router.get('/:id', (req, res) => {
  const task = store.getTask(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

router.post('/', (req, res) => {
  const errors = validateTaskPayload(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  const { title, description, dueDate } = req.body;
  const task = store.createTask({ title, description, dueDate });
  res.status(201).json(task);
});

router.patch('/:id', (req, res) => {
  if (req.body.title !== undefined) {
    const errors = validateTaskPayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  }
  const task = store.updateTask(req.params.id, req.body);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

router.delete('/:id', (req, res) => {
  const removed = store.deleteTask(req.params.id);
  if (!removed) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(204).end();
});

module.exports = router;
