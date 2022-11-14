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

  // individual post fetch
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
        console.log('post --> ', post);
        const postId = post.id;
        const { body, statusCode } = await supertest(app).get(
          `/api/posts/${postId}`,
        );

        expect(statusCode).toBe(200);
        expect(body.data.id).toBe(postId);
      });
    });
  });
});
