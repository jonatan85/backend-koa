import passport from 'koa-passport';

const authPassport = async (ctx, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) return reject(err);
      if (!user) {
        ctx.status = 401;
        ctx.body = { message: 'Acceso no autorizado' };
        return reject(new Error('Unauthorized'));
      }
      ctx.state.user = user;
      return resolve(next());
    })(ctx, next);
  });
};

export default authPassport;
