import fs from 'node:fs/promises';
import path from 'node:path';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/pathHendlers.js';
import { env } from './env.js';
import { EMAIL } from '../constants/email.js';

export const saveFileToUploadDir = async (file) => {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return `${env(EMAIL.APP_DOMAIN)}/uploads/${file.filename}`;
};
