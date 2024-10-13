import { loginUser, registerUser } from '../services/auth.js';
import { serializeUser } from '../utils/serializeUse.js';
import { tokenLifeTime } from '../constants/tokenLifeTime.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: serializeUser(user),
  });
};

export const loginUserController = async (req, res, next) => {
  const session = await loginUser(req.body);
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: tokenLifeTime.DAYS,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: tokenLifeTime.DAYS,
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: session.accessToken,
  });
};
