import jwt from 'jsonwebtoken';
import TokenBlacklist from '../models/TokenBlacklist.js';

const isAuthJWT = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    ctx.status = 401;
    ctx.body = { error: 'No estás autorizado' };
    return;
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Token inválido' };
    return;
  }

  // Verificar si el token está en la blacklist
  const isBlacklisted = await TokenBlacklist.findOne({ token });
  if (isBlacklisted) {
    ctx.status = 403;
    ctx.body = { error: 'Token revocado, inicia sesión nuevamente' };
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    ctx.state.user = { id: payload.id, email: payload.email };
    await next();
  } catch (err) {
    ctx.status = 403;
    ctx.body = { error: 'Token inválido' };
  }
};

export default isAuthJWT;
