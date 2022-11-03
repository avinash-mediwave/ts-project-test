import request from 'supertest';

import createServer from '../../src/server';

const app = createServer();

describe('Test the /posts endpoints', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      data: [
        {
          id: 1234,
          content: 'This is a simple content',
        },
      ],
    });
  });
});
