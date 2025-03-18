import Router from '@koa/router';
import authPassport from '../middlewares/auth-passport.middleware.js';
import isAuthJWT from '../middlewares/auth-jwt.middleware.js';

const router = new Router({ prefix: '/protected' });

router.get('/dashboard', authPassport, async (ctx) => {
  ctx.body = { message: `Bienvenido, usuario ${ctx.state.user.email}` };
});

router.get('/dashboard', isAuthJWT, async (ctx) => {
  ctx.body = { message: `Bienvenido, usuario ${ctx.state.user.email}` };
});

export default router;
