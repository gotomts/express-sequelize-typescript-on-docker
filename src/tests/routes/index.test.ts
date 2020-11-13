import request from 'supertest';

import app from '../../app';

describe('/', () => {
  it('GET "/" リクエストステータスが200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('ok');
  });
});
