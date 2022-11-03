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
  const post = createPostService({
    content: req.body.content,
  });
  return res.send({
    data: { id: post },
  });
}

export async function getPostHandler(req: Request, res: Response) {
  const post = getOnePostService(Number(req.params.id));
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
  const posts = getAllPostsService();
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

  const success = updatePostService(Number(req.params.id), {
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
  const status = removePostService(Number(req.params.id));

  if (status === -1) {
    return res.status(404).json({
      message: 'Post not found',
    });
  }

  return res.send({
    message: 'Post deleted successfully',
  });
}
