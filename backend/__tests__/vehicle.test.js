const request = require('supertest');
const createApp = require('../app');

const app = createApp();

describe('Vehicle API', () => {
  it('rejects requests without a token', async () => {
    const res = await request(app).get('/api/vehicles');
    expect(res.status).toBe(401);
  });
});