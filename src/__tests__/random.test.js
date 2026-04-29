const request = require('supertest');
const app = require('../server');

describe('GET /random', () => {
  it('returns a uuid, number, and dice roll', async () => {
    const res = await request(app).get('/random');
    expect(res.status).toBe(200);
    expect(typeof res.body.uuid).toBe('string');
    expect(res.body.uuid).toMatch(/^[0-9a-f-]{36}$/);
    expect(Number.isInteger(res.body.number)).toBe(true);
    expect(res.body.number).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(res.body.dice)).toBe(true);
    expect(res.body.dice).toBeGreaterThanOrEqual(1);
    expect(res.body.dice).toBeLessThanOrEqual(6);
  });
});
