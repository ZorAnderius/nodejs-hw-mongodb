import { env } from './utils/env.js';
import { connect } from './constants/connection.js';
import app, { logger } from './app.js';

const PORT = Number(env(connect.PORT, '3000'));

export const setupServer = () => {
  app.listen(PORT, () => {
    logger.info(`Server is running on the port ${PORT}`);
  });
};
