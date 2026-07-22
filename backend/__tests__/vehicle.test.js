it('updates a vehicle', async () => {
    const token = await getToken();
    const create = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send(sampleVehicle);

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