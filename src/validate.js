function validateTaskPayload(body) {
  const errors = [];

  if (!body.title || typeof body.title !== 'string') {
    errors.push('title is required and must be a string');
  }

  if (body.description && typeof body.description !== 'string') {
    errors.push('description must be a string');
  }

  if (body.dueDate && isNaN(Date.parse(body.dueDate))) {
    errors.push('dueDate must be a valid ISO date string');
  }

  return errors;
}

module.exports = { validateTaskPayload };
