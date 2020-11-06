import request from 'supertest';

import app from '../../app';

describe('/', () => {
  it('GET "/users" リクエストステータスが200', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    // expect(response.body.message).toBe('ok');
  });
});
