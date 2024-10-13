import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UserCollection } from '../db/model/users.js';

export const registerUser = async ({ name, email, password }) => {
  const isExist = await UserCollection.findOne({ email });
  if (isExist) throw createHttpError(409, 'Email in use');

  const hashedPassword =await bcrypt.hash(password, 10);

  const user = UserCollection.create({
    name,
    email,
    password: hashedPassword,
  });
  return user;
};
