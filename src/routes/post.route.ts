import { Router } from 'express';

import {
  createPostHandler,
  getPostHandler,
  getAllPostsHandler,
  updatePostHandler,
  removePostHandler,
} from '../controllers/post.controller';

const router = Router();

router.get('/', getAllPostsHandler);
router.post('/', createPostHandler);
router.get('/:id', getPostHandler);
router.put('/:id', updatePostHandler);
router.delete('/:id', removePostHandler);

export default router;
