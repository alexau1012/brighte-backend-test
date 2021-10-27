import * as request from 'supertest';
import app from '../';

describe('Referrals API', () => {

  it('should return all referrals as array', async () => {
    const result = await request(app).get('/referrals');

    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
  });

  it('should return a referral as an object', async () => {
    const result = await request(app).get('/referrals/1');

    expect(result.status).toEqual(200);
    expect(result.body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      givenName: expect.any(String),
      surName: expect.any(String),
      email: expect.any(String),
      phone: expect.any(String),
    }));
  })
});
