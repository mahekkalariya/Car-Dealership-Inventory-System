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

// Admin users can't be created through the public register endpoint by
// design (that would let anyone self-promote). For now, in tests, we
// register normally then flip the role directly via the model — the
// real "how do admins get created" question is a product decision to
// revisit later (e.g. manual DB promotion, invite codes).
const User = require('../models/User');

async function getAdminToken(email = 'admin@example.com') {
  const token = await getToken(email);
  await User.findOneAndUpdate({ email }, { role: 'admin' });
  // Re-login so the JWT actually reflects the updated role.
  const res = await request(app).post('/api/auth/login').send({ email, password: 'password123' });
  return res.body.token;
}

describe('Vehicle API', () => {
  it('rejects requests without a token', async () => {
    const res = await request(app).get('/api/vehicles');
    expect(res.status).toBe(401);
  });

  it('decreases quantity on purchase', async () => {
    const token = await getToken();
    const create = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...sampleVehicle, quantity: 1 });

    const res = await request(app)
      .post(`/api/vehicles/${create.body._id}/purchase`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(0);
  });

  it('rejects purchase when out of stock', async () => {
    const token = await getToken();
    const create = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...sampleVehicle, quantity: 0 });

    const res = await request(app)
      .post(`/api/vehicles/${create.body._id}/purchase`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(400);
  });

  it('creates a vehicle when authenticated', async () => {
    const token = await getToken();
    const res = await request(app).post('/api/vehicles').set('Authorization', `Bearer ${token}`).send(sampleVehicle);
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

  it('searches vehicles by make', async () => {
    const token = await getToken();
    await request(app).post('/api/vehicles').set('Authorization', `Bearer ${token}`).send(sampleVehicle);
    await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...sampleVehicle, make: 'Honda', model: 'Civic' });

    const res = await request(app)
      .get('/api/vehicles/search?make=Toyota')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].make).toBe('Toyota');
  });

  it('searches vehicles by price range', async () => {
    const token = await getToken();
    await request(app).post('/api/vehicles').set('Authorization', `Bearer ${token}`).send(sampleVehicle); // 25000
    await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...sampleVehicle, make: 'Ford', model: 'F-150', price: 41000 });

    const res = await request(app)
      .get('/api/vehicles/search?maxPrice=30000')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].make).toBe('Toyota');
  });

  it('updates a vehicle', async () => {
    const token = await getToken();
    const create = await request(app).post('/api/vehicles').set('Authorization', `Bearer ${token}`).send(sampleVehicle);
    const res = await request(app)
      .put(`/api/vehicles/${create.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ price: 23000 });
    expect(res.status).toBe(200);
    expect(res.body.price).toBe(23000);
  });

  it('returns 404 when updating a vehicle that does not exist', async () => {
    const token = await getToken();
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await request(app)
      .put(`/api/vehicles/${fakeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ price: 23000 });
    expect(res.status).toBe(404);
  });

  it('prevents non-admins from deleting a vehicle', async () => {
    const token = await getToken();
    const create = await request(app).post('/api/vehicles').set('Authorization', `Bearer ${token}`).send(sampleVehicle);

    const res = await request(app)
      .delete(`/api/vehicles/${create.body._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(403);
  });

  it('allows admins to delete a vehicle', async () => {
    const token = await getToken();
    const create = await request(app).post('/api/vehicles').set('Authorization', `Bearer ${token}`).send(sampleVehicle);

    const adminToken = await getAdminToken();
    const res = await request(app)
      .delete(`/api/vehicles/${create.body._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
  });
});