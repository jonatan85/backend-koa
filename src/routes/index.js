import Router from '@koa/router';
import authRoutes from './auth.routes.js';
import protectedRoutes from './protected.routes.js';

const router = new Router();

router.use(authRoutes.routes());
router.use(protectedRoutes.routes());

export default router;
