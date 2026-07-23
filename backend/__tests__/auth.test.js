const request = require('supertest');
const createApp = require('../app');

const app = createApp();

describe('POST /api/auth/login', () => {
  const validUser = { name: 'Jane Doe', email: 'jane2@example.com', password: 'password123' };

  beforeEach(async () => {
    await request(app).post('/api/auth/register').send(validUser);
  });

  it('registers as admin when role is explicitly specified', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Admin User',
      email: 'admin2@example.com',
      password: 'password123',
      role: 'admin'
    });

    expect(res.status).toBe(201);
    expect(res.body.user.role).toBe('admin');
  });

  it('defaults to user role when none is specified', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Plain User',
      email: 'plain@example.com',
      password: 'password123'
    });

    expect(res.status).toBe(201);
    expect(res.body.user.role).toBe('user');
  });

  it('logs in with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: validUser.email, password: validUser.password });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('rejects incorrect password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: validUser.email, password: 'wrongpassword' });

    expect(res.status).toBe(401);
  });

  it('rejects unknown email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nobody@example.com', password: 'password123' });

    expect(res.status).toBe(401);
  });
});