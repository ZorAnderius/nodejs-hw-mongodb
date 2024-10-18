import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import handlebars from 'handlebars';
import jwt from 'jsonwebtoken';
import path from 'node:path';
import fs from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { UserCollection } from '../db/model/users.js';
import { SessionCollection } from '../db/model/sessions.js';
import { tokenLifeTime } from '../constants/tokenLifeTime.js';
import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendMail.js';
import { EMAIL } from '../constants/email.js';
import { TEMPLATE_DIR } from '../constants/pathHendlers.js';
import { logger } from '../utils/logger/logger.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + tokenLifeTime.FIFTEEN_MINUTE),
    refreshTokenValidUntil: new Date(Date.now() + tokenLifeTime.DAYS),
  };
};

export const registerUser = async ({ name, email, password }) => {
  const isExist = await UserCollection.findOne({ email });
  if (isExist) throw createHttpError(409, 'Email in use');

  const hashedPassword = await bcrypt.hash(password, 14);

  const user = await UserCollection.create({
    name,
    email,
    password: hashedPassword,
  });
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });
  if (!user) throw createHttpError(401, 'Email or password is invalid');

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword)
    throw createHttpError(401, 'Email or password is invalid');

  await SessionCollection.deleteOne({ userId: user._id });

  const newSession = createSession();

  return await SessionCollection.create({
    userId: user._id,
    ...newSession,
  });
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) throw createHttpError(401, 'Session not found');

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isSessionTokenExpired)
    throw createHttpError(401, 'Session token expired');

  const newSession = createSession();

  await SessionCollection.deleteOne({ _id: session._id, refreshToken });

  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const requestResetToken = async (email) => {
  const user = await UserCollection.findOne({ email });
  if (!user) throw createHttpError(404, 'User not found');
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env(EMAIL.JWT_SECRET),
    {
      expiresIn: '15m',
    },
  );

  const resetPasswordTemplate = path.join(
    TEMPLATE_DIR,
    'reset-password-email.html',
  );

  const templateSource = (await fs.readFile(resetPasswordTemplate)).toString();

  const templates = handlebars.compile(templateSource);

  const html = templates({
    name: user.name,
    link: `${env(EMAIL.APP_DOMAIN)}/reset-password?token=${resetToken}`,
  });

  try {
    await sendEmail({
      from: env(EMAIL.SMTP_FROM),
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch (error) {
    logger.info(error.message);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

export const resetPassword = async (payload, sessionId) => {
  let entries;
  try {
    entries = jwt.verify(payload.token, env(EMAIL.JWT_SECRET));
  } catch (error) {
    throw error instanceof Error
      ? createHttpError(401, 'Token is expired or invalid.')
      : error;
  }

  const user = await UserCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) throw createHttpError(404, 'User not found');

  await SessionCollection.deleteOne({ _id: sessionId });

  const hashedPassword = await bcrypt.hash(payload.password, 14);

  await UserCollection.updateOne(
    { _id: user._id },
    { password: hashedPassword },
  );
};
