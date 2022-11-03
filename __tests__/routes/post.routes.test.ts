import request from 'supertest';

import createServer from '../../src/server';

const app = createServer();

describe('Test the /posts endpoints', () => {
  // Get all posts
  test('It should return only one post initially', async () => {
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

  // Get one post - happy
  test('Should return a single posts info', async () => {
    const response = await request(app).get('/api/posts/1234');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      data: {
        id: 1234,
        content: 'This is a simple content',
      },
    });
  });

  // get one post - unhappy
  test('Should error when requesting a post that does not exist', async () => {
    const response = await request(app).get('/api/posts/12345');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: 'Post not found',
    });
  });

  // create new post - happy!
  test('Should create a new post', async () => {
    const testPost = {
      content: 'This is a MakGora',
    };
    const response = await request(app).post('/api/posts').send(testPost);
    expect(response.statusCode).toBe(200);
  });

  // create new post - unhappy!
  test('Should not create a new post if content is not provided', async () => {
    const testPost = {
      fake: 'data',
    };
    const response = await request(app).post('/api/posts').send(testPost);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: 'Content is empty',
    });
  });

  // update post - happy!
  test('Should update a post if content is valid', async () => {
    const testPost = {
      content: 'This is a good content',
    };
    const response = await request(app).put('/api/posts/1234').send(testPost);
    expect(response.statusCode).toBe(200);
  });

  // update post - unhappy!
  test('Should not update a post if content is not provided', async () => {
    const testPost = {
      fake: 'data',
    };
    const response = await request(app).put('/api/posts/1234').send(testPost);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: 'Content is empty',
    });
  });

  // update post - unhappy!
  test('Should not update a post if post id is not found', async () => {
    const testPost = {
      content: 'Valid content but id is absent',
    };
    const response = await request(app).put('/api/posts/12345').send(testPost);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: 'Failed to update post',
    });
  });

  // delete post - happy!
  test('Should remove a valid post', async () => {
    const response = await request(app).delete('/api/posts/1234');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: 'Post deleted successfully',
    });
  });

  // delete post - unhappy
  test('Should error when deleting a post that does not exist', async () => {
    const response = await request(app).delete('/api/posts/12345');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: 'Post not found',
    });
  });
});
