import prisma from '../prisma';

// https://www.prisma.io/docs/concepts/components/prisma-client/crud

export const getAllPostsService = async () => await prisma.post.findMany();

export const getOnePostService = async (id: string) =>
  await prisma.post.findUnique({
    where: {
      id,
    },
  });

export const removePostService = async (id: string) => {
  return await prisma.post.delete({
    where: {
      id,
    },
  });
};

export const updatePostService = async (
  id: string,
  payload: { content: string },
) => {
  return await prisma.post.update({
    where: { id },
    data: {
      content: payload.content,
    },
  });
};

export const createPostService = async (payload: { content: string }) => {
  return await prisma.post.create({
    data: {
      content: payload.content,
    },
  });
};
