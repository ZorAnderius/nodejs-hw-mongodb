import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  requestResetToken,
  resetPassword,
} from '../services/auth.js';
import { serializeUser } from '../utils/serializeUse.js';
import { tokenLifeTime } from '../constants/tokenLifeTime.js';

const setupSession = async (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + tokenLifeTime.DAYS),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + tokenLifeTime.DAYS),
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: serializeUser(user),
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  setupSession(res, session);
  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  setupSession(res, session);
  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) await logoutUser(req.cookies.sessionId);
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    status: 200,
    message: 'Reset password email was successfully sent!',
    data: {},
  });
};
export const resetPasswordController = async (req, res) => {  
  await resetPassword(req.body, req.cookies.sessionId);

  res.json({
    status: 200,
    message: 'Password was successfully reset!',
    data: {},
  });
};
