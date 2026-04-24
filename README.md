# task-tracker-api

A tiny REST API for tracking tasks. Built with Node.js and Express.

## Getting started

```bash
npm install
npm start
```

The server listens on port `3000` by default.

## API

### `GET /health`
Returns `{ "status": "ok" }`.

### `GET /tasks`
Returns all tasks.

### `GET /tasks/:id`
Returns a single task by id.

### `POST /tasks`
Creates a new task.

```json
{
  "title": "Ship v1",
  "description": "Cut the first release",
  "dueDate": "2026-05-01"
}
```

### `PATCH /tasks/:id`
Partially updates a task. Any of `title`, `description`, `dueDate`, `completed` can be sent.

### `DELETE /tasks/:id`
Deletes a task. Returns `204` on success.
