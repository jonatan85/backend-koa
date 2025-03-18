import Router from '@koa/router';
import bcrypt from 'bcryptjs';

import getJWT from '../utils/jsonwebtoken.js';
import UserDos from '../models/UserDos.js';
import TokenBlacklist from '../models/TokenBlacklist.js';

const router = new Router({ prefix: '/users-dos' });


router.get('/', async (ctx) => {
  try {
    const users = await UserDos.find().select('-password');
    ctx.status = 200;
    ctx.body = users;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener los usuarios', details: err.message };
  }
});


router.post('/register', async (ctx) => {
  try {
    const { email, password, name, surnames, address, postalCode, city, phoneNumber, role } = ctx.request.body;

    if (!email || !password || !name) {
      ctx.status = 400;
      ctx.body = { error: 'Email, password y name son obligatorios' };
      return;
    }

    const existingUser = await UserDos.findOne({ email });
    if (existingUser) {
      ctx.status = 400;
      ctx.body = { error: 'El usuario ya está registrado' };
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserDos({
      email,
      password: hashedPassword,
      name,
      surnames,
      address,
      postalCode,
      city,
      phoneNumber,
      role: role || 'user'
    });

    const createdUser = await newUser.save();
    ctx.status = 201;
    ctx.body = {
      message: 'Usuario registrado con éxito',
      user: { id: createdUser._id, email: createdUser.email, name: createdUser.name, role: createdUser.role }
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Error al registrar usuario', details: err.message };
  }
});

router.post('/login-jwt', async (ctx) => {
  try {
    const { email, password } = ctx.request.body;

    if (!email || !password) {
      ctx.status = 400;
      ctx.body = { error: 'El email y la contraseña son obligatorios' };
      return;
    }

    const user = await UserDos.findOne({ email });
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'El usuario no existe' };
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      ctx.status = 403;
      ctx.body = { error: 'La contraseña no es válida' };
      return;
    }

    const token = getJWT(user);
    ctx.status = 200;
    ctx.body = {
      message: 'Inicio de sesión exitoso',
      user: { _id: user._id, email: user.email },
      token
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Error en la autenticación', details: err.message };
  }
});

router.post('/logout-jwt', async (ctx) => {
  try {
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

    await new TokenBlacklist({ token }).save();

    ctx.status = 200;
    ctx.body = { message: 'Sesión cerrada correctamente' };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Error al cerrar sesión', details: err.message };
  }
});

router.get('/search/:id', async (ctx) => {
  try {
    const user = await UserDos.findById(ctx.params.id);
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'No existe el usuario con el ID indicado' };
      return;
    }
    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Error al buscar usuario', details: err.message };
  }
});

router.put('/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    const updates = ctx.request.body;

    const user = await UserDos.findById(id);
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'Usuario no encontrado' };
      return;
    }

    const updatedUser = await UserDos.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    ctx.status = 200;
    ctx.body = {
      message: 'Usuario actualizado con éxito',
      user: updatedUser
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Error al actualizar usuario', details: err.message };
  }
});

router.delete('/:id', async (ctx) => {
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
