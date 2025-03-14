import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import routes from './routes/index.js';
import config from './config/env.js';
import connectDB from './config/database.js';
import passport from './config/passport.js';

const app = new Koa();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(bodyParser());
app.use(helmet());
app.use(cors());

// Inicializar Passport
app.use(passport.initialize());

// Rutas
app.use(routes.routes()).use(routes.allowedMethods());

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`✅ Servidor Koa corriendo en http://localhost:${PORT}`);
});
