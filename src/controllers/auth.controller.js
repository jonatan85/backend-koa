import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (ctx) => {
  try {
    const { name, email, password } = ctx.request.body;
    
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      ctx.status = 400;
      ctx.body = { message: 'El usuario ya existe' };
      return;
    }

    // Crear nuevo usuario
    const newUser = new User({ name, email, password });
    await newUser.save();

    ctx.status = 201;
    ctx.body = { message: 'Usuario registrado exitosamente' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Error en el registro', error: error.message };
  }
};

export const login = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    const user = await User.findOne({ email });

    // Verificar si el usuario existe
    if (!user || !(await user.comparePassword(password))) {
      ctx.status = 401;
      ctx.body = { message: 'Credenciales incorrectas' };
      return;
    }

    // Generar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    ctx.body = { message: 'Login exitoso', token };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Error en el login', error: error.message };
  }
};
