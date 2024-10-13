import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UserCollection } from '../db/model/users.js';

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
  return user;
};
