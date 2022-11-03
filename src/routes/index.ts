import { Router } from 'express';

import postRoutes from './post.route';
import indexRoutes from './index.route';

const router = Router();

router.use('/posts', postRoutes);
router.use('/', indexRoutes);

export default router;
