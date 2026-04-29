const request = require('supertest');
const app = require('../server');
const { version } = require('../../package.json');

describe('GET /version', () => {
  it('returns version, commit, and uptime', async () => {
    const res = await request(app).get('/version');
    expect(res.status).toBe(200);
    expect(res.body.version).toBe(version);
    expect(typeof res.body.commit).toBe('string');
    expect(res.body.commit.length).toBeGreaterThan(0);
    expect(typeof res.body.uptime).toBe('number');
    expect(res.body.uptime).toBeGreaterThanOrEqual(0);
  });
});
