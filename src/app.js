import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoMiddleware from 'pino-http';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/contacts.js';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'req,res,hostname,pid',
      messageFormat: '{msg}',
    },
  },
});

const app = express();

app.use(
  express.json({ type: ['application/json', 'application/vnd.api+json'] }),
);
app.use(cors());
app.use(pinoMiddleware({ logger }));

app.use('/contacts', router);

app.use('*', notFoundHandler);
app.use(errorHandler);

export default app;
