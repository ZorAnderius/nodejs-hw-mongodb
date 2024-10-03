import express from 'express';

import { env } from './utils/env.js';
import { connect } from './constants/connection.js';
import { initExpressSetUp } from './middlewares/initExpressSetUp.js';
import { errorHandle } from './middlewares/errorHandle.js';
import { notFound } from './middlewares/notFound.js';
import router from './routers/contacts.js';

const PORT = Number(env(connect.PORT, '3000'));

export const setupServer = () => {
  const app = express();

  const logger = initExpressSetUp(app);

  app.use(router);

  app.use('*', notFound);

  app.use(errorHandle);

  app.listen(PORT, () => {
    logger.info(`Server is running on the port ${PORT}`);
  });
};
