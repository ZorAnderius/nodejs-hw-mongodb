import Joi from "joi";

export const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required().messages({
    'any.required': 'Code is required.',
    'string.empty': 'Code cannot be empty.',
  }),
});