import Router from '@koa/router';
import authRoutes from './auth.routes.js';
import protectedRoutes from './protected.routes.js';
import uploadRoutes from './upload.routes.js';
import userDosRoutes from './userDos.routes.js';
import adminRoutes from './admin.routes.js';
import pizzasRoutes from './pizzas.routes.js';
import ingredientsRoutes from './ingredients.routes.js';
import orderRoutes from './order.routes.js';

const router = new Router();

router.use(authRoutes.routes());
router.use(protectedRoutes.routes());
router.use(uploadRoutes.routes());
router.use(userDosRoutes.routes());
router.use(adminRoutes.routes());
router.use(pizzasRoutes.routes());
router.use(ingredientsRoutes.routes());
router.use(orderRoutes.routes());

export default router;
