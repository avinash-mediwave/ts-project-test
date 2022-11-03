import request from 'supertest';

import server from '../../src/server';

describe('Post routes', () => {
  test('Get all posts', async () => {
    const res = await request(server).get('/users');
    expect(res.body).toEqual(['Goon', 'Tsuki', 'Joe']);
  });
});
