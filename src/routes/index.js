import Router from '@koa/router';
import authRoutes from './auth.routes.js';
import protectedRoutes from './protected.routes.js';
import uploadRoutes from './upload.routes.js';
import userDosRoutes from './userDos.routes.js';


const router = new Router();

router.use(authRoutes.routes());
router.use(protectedRoutes.routes());
router.use(uploadRoutes.routes());
router.use(userDosRoutes.routes());


export default router;
