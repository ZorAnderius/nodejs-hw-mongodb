import createHttpError from 'http-errors';
import { registerUser } from '../services/auth.js';
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
