import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import routes from './routes/index.js';
import config from './config/env.js';

const app = new Koa();

app.use(bodyParser());
app.use(helmet());
app.use(cors());

app.use(routes.routes()).use(routes.allowedMethods());

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`✅ Servidor Koa corriendo en http://localhost:${PORT}`);
});