import express from 'express';

import { env } from './utils/env.js';
import { connect } from './constants/connection.js';
import { initExpressSetUp } from './middlewares/initExpressSetUp.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/contacts.js';

const PORT = Number(env(connect.PORT, '3000'));

export const setupServer = () => {
  const app = express();

  const logger = initExpressSetUp(app);

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    logger.info(`Server is running on the port ${PORT}`);
  });
};
