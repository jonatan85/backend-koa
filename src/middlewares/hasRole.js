const hasRole = (rolesPermitidos) => {
    return async (ctx, next) => {
      if (!ctx.state.user || !rolesPermitidos.includes(ctx.state.user.role)) {
        ctx.status = 403;
        ctx.body = { error: "Acceso denegado, permisos insuficientes." };
        return;
      }
      await next();
    };
  };
  
  export default hasRole;
  