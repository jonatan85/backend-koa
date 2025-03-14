import jwt from 'jsonwebtoken';

const authMiddleware = async (ctx, next) => {
  const token = ctx.headers.authorization?.split(' ')[1];

  if (!token) {
    ctx.status = 401;
    ctx.body = { message: 'Acceso no autorizado' };
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    ctx.state.user = decoded; // Guarda el usuario en el contexto
    await next();
  } catch (error) {
    ctx.status = 403;
    ctx.body = { message: 'Token inválido' };
  }
};

export default authMiddleware;
