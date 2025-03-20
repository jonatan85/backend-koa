import Router from '@koa/router';
import authRoutes from './auth.routes.js';
import protectedRoutes from './protected.routes.js';
import uploadRoutes from './upload.routes.js';
import userDosRoutes from './userDos.routes.js';
import adminRoutes from './admin.routes.js';
import pizzasRouter from './pizzas.routes.js';

const router = new Router();

router.use(authRoutes.routes());
router.use(protectedRoutes.routes());
router.use(uploadRoutes.routes());
router.use(userDosRoutes.routes());
router.use(adminRoutes.routes());
router.use(pizzasRouter.routes());

export default router;
