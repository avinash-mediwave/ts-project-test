import supertest from 'supertest';

import createServer from '../src/server';

const app = createServer();

describe('general', () => {
  describe('get health route', () => {
    it('should return a 200', async () => {
      await supertest(app).get(`/api/health`).expect(200);
    });
  });
});
