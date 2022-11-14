import supertest from 'supertest';

import { PrismaClient } from '@prisma/client';
import createServer from '../src/server';
import { createPostService } from '../src/services/posts.service';

const client = new PrismaClient();
const app = createServer();

const testPost = {
  content: 'This is very much a makgora',
};

describe('post', () => {
  // beforeAll(async () => {
  //   // connection??
  // });

  afterAll(async () => {
    await client.$disconnect();
  });

  // fetch individual post
  describe('get post route', () => {
    // unhappy
    describe('given the post does not exist', () => {
      it('should return a 404', async () => {
        const postId = '1234';
        await supertest(app).get(`/api/posts/${postId}`).expect(404);
      });
    });

    // happy
    describe('given the post does exist', () => {
      it('should return a 200 status and the post', async () => {
        const post = await createPostService(testPost);
        const postId = post.id;
        const { body, statusCode } = await supertest(app).get(
          `/api/posts/${postId}`,
        );

        expect(statusCode).toBe(200);
        expect(body.data.id).toBe(postId);
      });
    });
  });

  // creating posts
  describe('create post route', () => {
    // unhappy
    describe('given the body payload is incorrect', () => {
      it('should return a 400 with an error message', async () => {
        const testPost = {
          fake: 'data',
        };
        const { statusCode, body } = await supertest(app)
          .post('/api/posts')
          .send(testPost);
        expect(statusCode).toBe(400);
        expect(body).toEqual({
          message: 'Content is empty',
        });
      });
    });

    // happy
    describe('given the body payload is correct', () => {
      it('should return a 200', async () => {
        const testPost = {
          content: 'Han shot first',
        };
        const { statusCode } = await supertest(app)
          .post('/api/posts')
          .send(testPost);
        expect(statusCode).toBe(200);
      });
    });
  });

  // updating a post
  describe('update post route', () => {
    // unhappy
    describe('given the post does not exist', () => {
      it('should return a 404', async () => {
        const { statusCode } = await supertest(app)
          .put('/api/posts/3412')
          .send({
            content: 'Valid content but id is absent',
          });
        expect(statusCode).toBe(400);
      });
    });

    // unhappy
    describe('given the post id exists but the payload is invalid', () => {
      it('should return a 400', async () => {
        const post = await createPostService(testPost);
        const postId = post.id;
        const { statusCode, body } = await supertest(app)
          .put(`/api/posts/${postId}`)
          .send({
            fake: 'invalid data',
          });
        expect(statusCode).toBe(400);
        expect(body).toEqual({
          message: 'Content is empty',
        });
      });
    });

    // happy
    describe('given the post id exists but the payload is valid', () => {
      it('should update the post', async () => {
        const testPost = {
          content: 'Valid content that will get updated',
        };
        const post = await createPostService(testPost);
        const postId = post.id;
        const { statusCode, body } = await supertest(app)
          .put(`/api/posts/${postId}`)
          .send(testPost);
        expect(statusCode).toBe(200);
      });
    });
  });

  describe('delete post route', () => {
    // unhappy
    describe('given the post does not exist', () => {
      it('should return a 404', async () => {
        const { statusCode } = await supertest(app).delete('/api/posts/3412');
        expect(statusCode).toBe(400);
      });
    });

    // happy
    describe('given the post id exists', () => {
      it('should delete the post', async () => {
        const post = await createPostService(testPost);
        const postId = post.id;
        const { statusCode } = await supertest(app).delete(
          `/api/posts/${postId}`,
        );
        expect(statusCode).toBe(200);
      });
    });
  });

  describe('all posts route', () => {
    // unhappy
    describe('given the posts list is present - dummy!', () => {
      it('should return a 200', async () => {
        const { statusCode } = await supertest(app).get('/api/posts');
        expect(statusCode).toBe(200);
      });
    });
  });
});
