const { randomUUID } = require('crypto');

const tasks = new Map();

function listTasks() {
  return Array.from(tasks.values());
}

function getTask(id) {
  return tasks.get(id);
}

function createTask({ title, description, dueDate }) {
  const id = randomUUID();
  const task = {
    id,
    title,
    description: description || '',
    dueDate: dueDate || null,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.set(id, task);
  return task;
}

function updateTask(id, patch) {
  const existing = tasks.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...patch, id };
  tasks.set(id, updated);
  return updated;
}

function deleteTask(id) {
  return tasks.delete(id);
}

module.exports = {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
