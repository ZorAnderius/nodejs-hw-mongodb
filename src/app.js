import express from 'express';
import cors from 'cors';
import pinoMiddleware from 'pino-http';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/index.js';
import { logger } from './utils/logger/logger.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  express.json({ type: ['application/json', 'application/vnd.api+json'] }),
);
app.use(cors());
app.use(pinoMiddleware({ logger }));
app.use(cookieParser());

app.use(router);

app.use('*', notFoundHandler);
app.use(errorHandler);

export default app;
