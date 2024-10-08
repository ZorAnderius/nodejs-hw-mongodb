import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Contact name is required.',
    'string.empty': 'Contact name cannot be empty.',
    'string.min': 'Contact name should be at least 3 characters long.',
    'string.max': 'Contact name should not exceed 30 characters.',
  }),
  phoneNumber: Joi.string()
    .length(13)
    .pattern(/^\+\d{3}\d{9}$/)
    .required()
    .messages({
      'any.required': 'Phone number is required.',
      'string.empty': 'Phone number cannot be empty.',
      'string.length': 'Phone number must be exactly 10 digits long.',
      'string.pattern.base':
        'Phone number is invalid or wrong. Phone number format is +XXXYYYYYYYYY.',
    }),
  email: Joi.string().min(3).max(20).email().messages({
    'any.required': 'Email is required.',
    'string.empty': 'Email cannot be empty.',
    'string.email': 'Invalid email format.',
  }),
  isFavourite: Joi.boolean().default(false).messages({
    'boolean.base': 'The field must be a boolean (true or false)',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .default('personal')
    .messages({
      'any.required': 'The contactType field is required',
      'any.only':
        'The contactType must be one of the following values: work, home, personal',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.min': 'Contact name should be at least 3 characters long.',
    'string.max': 'Contact name should not exceed 30 characters.',
  }),
  phoneNumber: Joi.string()
    .length(13)
    .pattern(/^\+\d{3}\d{9}$/)
    .messages({
      'string.length': 'Phone number must be exactly 10 digits long.',
      'string.pattern.base':
        'Phone number is invalid or wrong. Phone number format is +XXXYYYYYYYYY.',
    }),
  email: Joi.string().min(3).max(20).email().messages({
    'string.email': 'Invalid email format.',
  }),
  isFavourite: Joi.boolean().default(false).messages({
    'boolean.base': 'The field must be a boolean (true or false)',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .messages({
      'any.only':
        'The contactType must be one of the following values: work, home, personal',
    }),
});
