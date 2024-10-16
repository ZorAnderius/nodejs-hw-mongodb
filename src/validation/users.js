import Joi from 'joi';
import { VALID_EXP } from '../constants/validRegExp.js';

export const createUserSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required.',
    'string.empty': 'Name cannot be empty.',
  }),
  email: Joi.string().pattern(VALID_EXP.EMAIL).required().messages({
    'any.required': 'Email is required.',
    'string.empty': 'Email cannot be empty.',
    'string.pattern.base': 'Invalid email format.',
  }),
  password: Joi.string().pattern(VALID_EXP.PASSWORD).required().messages({
    'any.required': 'Password is required.',
    'string.empty': 'Password cannot be empty.',
    'string.pattern.base':
      'Invalid password format. Password must be at least: 1) one lowercase letter, 2) one uppercase letter, 3) one number, 4) one special character (from this set !@#$%^&*), 5) the total length of the password must be at least 8 characters.',
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().pattern(VALID_EXP.EMAIL).required().messages({
    'any.required': 'Email is required.',
    'string.empty': 'Email cannot be empty.',
    'string.pattern.base': 'Invalid email format.',
  }),
  password: Joi.string().pattern(VALID_EXP.PASSWORD).required().messages({
    'any.required': 'Password is required.',
    'string.empty': 'Password cannot be empty.',
    'string.pattern.base':
      'Invalid password format. Password must be at least: 1) one lowercase letter, 2) one uppercase letter, 3) one number, 4) one special character (from this set !@#$%^&*), 5) the total length of the password must be at least 8 characters.',
  }),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().pattern(VALID_EXP.EMAIL).required().messages({
    'any.required': 'Email is required.',
    'string.empty': 'Email cannot be empty.',
    'string.pattern.base': 'Invalid email format.',
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().pattern(VALID_EXP.PASSWORD).required().messages({
    'any.required': 'Password is required.',
    'string.empty': 'Password cannot be empty.',
    'string.pattern.base':
      'Invalid password format. Password must be at least: 1) one lowercase letter, 2) one uppercase letter, 3) one number, 4) one special character (from this set !@#$%^&*), 5) the total length of the password must be at least 8 characters.',
  }),
  token: Joi.string().required().messages({
    'any.required': 'Token is required.',
    'string.empty': 'Token cannot be empty.',
  }),
});
