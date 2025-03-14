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

const app = new Koa();
const router = new Router();

connectDB();

// Middlewares
app.use(bodyParser()); // Permite recibir datos en JSON
app.use(helmet()); // Agrega seguridad
app.use(cors()); // Permite peticiones desde otros dominios

// Rutas
app.use(routes.routes()).use(routes.allowedMethods());

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`✅ Servidor Koa corriendo en http://localhost:${PORT}`);
});
