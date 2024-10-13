import createHttpError from 'http-errors';
import { loginUser, registerUser } from '../services/auth.js';
import { serializeUser } from '../utils/serializeUse.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  if (!user) throw createHttpError(400, 'Bad request');

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: serializeUser(user),
  });
};

export const loginUserController = async (req, res) => {
    const user = await loginUser(req.body);
    const accessToken = 1;
    res.json({
      status: 200,
      message: 'Successfully logged in an user!',
      data: accessToken,
    });
};
