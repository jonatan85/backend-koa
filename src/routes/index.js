import Router from '@koa/router';
import authRoutes from './auth.routes.js';

const router = new Router();

router.use(authRoutes.routes());

export default router;
