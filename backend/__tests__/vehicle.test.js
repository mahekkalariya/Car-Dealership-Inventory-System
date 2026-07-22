const request = require('supertest');
const createApp = require('../app');

const app = createApp();

const sampleVehicle = {
  make: 'Toyota',
  model: 'Camry',
  category: 'Sedan',
  price: 25000,
  quantity: 5
};

async function getToken(email = 'buyer@example.com') {
  const res = await request(app).post('/api/auth/register').send({
    name: 'Test User',
    email,
    password: 'password123'
  });
  return res.body.token;
}

describe('Vehicle API', () => {
  it('rejects requests without a token', async () => {
    const res = await request(app).get('/api/vehicles');
    expect(res.status).toBe(401);
  });

  it('creates a vehicle when authenticated', async () => {
    const token = await getToken();

    const res = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send(sampleVehicle);

    expect(res.status).toBe(201);
    expect(res.body.make).toBe('Toyota');
    expect(res.body.quantity).toBe(5);
  });

  it('lists all vehicles', async () => {
    const token = await getToken();
    await request(app).post('/api/vehicles').set('Authorization', `Bearer ${token}`).send(sampleVehicle);

    const res = await request(app).get('/api/vehicles').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });
});