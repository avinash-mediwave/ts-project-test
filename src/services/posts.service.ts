interface IPost {
  id: number;
  content: string;
}

const posts: IPost[] = [{ id: 1234, content: 'This is a simple content' }];

export const getAllPostsService = () => posts;

export const getOnePostService = (id: number) => posts.find((p) => p.id == id);

export const removePostService = (id: number): number => {
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) {
    return -1;
  }
  posts.splice(idx, 1);
  return idx;
};

export const updatePostService = (
  id: number,
  payload: { content: string },
): boolean => {
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) {
    return false;
  }
  posts[idx]['content'] = payload.content;
  return true;
};

export const createPostService = (payload: { content: string }): number => {
  const post = {
    ...payload,
    id: new Date().getTime(),
  };
  posts.push(post);
  return post.id;
};
