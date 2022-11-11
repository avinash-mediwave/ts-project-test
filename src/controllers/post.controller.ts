import { Request, Response } from 'express';

import {
  getAllPostsService,
  getOnePostService,
  removePostService,
  updatePostService,
  createPostService,
} from '../services/posts.service';

// the validation is done by hand!
export async function createPostHandler(req: Request, res: Response) {
  if (!req.body.content) {
    return res.status(400).json({
      message: 'Content is empty',
    });
  }
  const post = await createPostService({
    content: req.body.content,
  });
  return res.send({
    data: { id: post.id },
  });
}

export async function getPostHandler(req: Request, res: Response) {
  const post = await getOnePostService(req.params.id);
  if (!post) {
    return res.status(404).json({
      message: 'Post not found',
    });
  }

  return res.send({
    data: post,
  });
}

export async function getAllPostsHandler(req: Request, res: Response) {
  const posts = await getAllPostsService();
  return res.send({
    data: posts,
  });
}

export async function updatePostHandler(req: Request, res: Response) {
  if (!req.body.content) {
    return res.status(400).json({
      message: 'Content is empty',
    });
  }

  const success = await updatePostService(req.params.id, {
    content: req.body.content,
  });

  if (!success) {
    return res.status(400).json({
      message: 'Failed to update post',
    });
  }

  return res.send({
    data: {
      id: req.params.id,
    },
  });
}

export async function removePostHandler(req: Request, res: Response) {
  const status = await removePostService(req.params.id);

  if (!status) {
    return res.status(404).json({
      message: 'Post not deleted or not found',
    });
  }

  return res.send({
    message: 'Post deleted successfully',
  });
}
