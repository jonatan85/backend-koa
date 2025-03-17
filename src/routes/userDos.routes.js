import Router from '@koa/router';
import bcrypt from 'bcryptjs';
import UserDos from '../models/UserDos.js';
import passport from 'koa-passport';
import getJWT from '../utils/jsonwebtoken.js';

const router = new Router({ prefix: '/users-dos' });

// 📌 Obtener todos los usuarios de UserDos
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

// 📌 Registrar un nuevo usuario en UserDos
router.post('/register', async (ctx) => {
  try {
    const { email, password, name, surnames, address, postalCode, city, phoneNumber } = ctx.request.body;

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
      phoneNumber
    });

    const createdUser = await newUser.save();
    ctx.status = 201;
    ctx.body = {
      message: 'Usuario registrado con éxito',
      user: { id: createdUser._id, email: createdUser.email, name: createdUser.name }
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Error al registrar usuario', details: err.message };
  }
});

// 📌 Inicio de sesión con JWT en UserDos
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

// 📌 Buscar usuario en UserDos por ID
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

export default router;
