import Router from '@koa/router';
import isAuthJWT from '../middlewares/auth-jwt.middleware.js';
import hasRole from '../middlewares/hasRole.js';
import UserDos from '../models/UserDos.js';

const router = new Router({ prefix: '/admin' });

router.get('/users', isAuthJWT, hasRole(['admin', 'superadmin']), async (ctx) => {
  try {
    const users = await UserDos.find().select('-password');
    ctx.status = 200;
    ctx.body = users;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener los usuarios', details: err.message };
  }
});

router.delete('/users/:id', isAuthJWT, hasRole(['superadmin']), async (ctx) => {
  try {
    const { id } = ctx.params;

    const user = await UserDos.findById(id);
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'Usuario no encontrado' };
      return;
    }

    await UserDos.findByIdAndDelete(id);
    ctx.status = 200;
    ctx.body = { message: 'Usuario eliminado con éxito' };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Error al eliminar usuario', details: err.message };
  }
});

export default router;
