import { PrismaClient } from '@prisma/client';

// TODO: based on environment, we'd have to tweak the logging
const prisma = new PrismaClient({
  log: ['info', 'query'],
});

export default prisma;
