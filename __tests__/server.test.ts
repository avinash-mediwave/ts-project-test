import request from 'supertest';

import createServer from '../src/server';

const app = createServer();

describe('Test the health endpoint', () => {
  test('It should give OK response', async () => {
    const response = await request(app).get('/api/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'OK' });
  });
});
