import { logger } from './utils/logger/logger.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExist } from './utils/createDirIfNotExist.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/pathHendlers.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    await createDirIfNotExist(TEMP_UPLOAD_DIR);
    await createDirIfNotExist(UPLOAD_DIR);
    setupServer();
  } catch (error) {
    logger.info(error.message);
  }
};

bootstrap();
