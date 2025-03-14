import Router from '@koa/router';
import authPassport from '../middlewares/auth-passport.middleware.js';

const router = new Router({ prefix: '/protected' });

router.get('/dashboard', authPassport, async (ctx) => {
  ctx.body = { message: `Bienvenido, usuario ${ctx.state.user.email}` };
});

export default router;
