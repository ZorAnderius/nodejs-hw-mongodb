export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      convert: false,
      abortEarly: false,
    });
    next();
  } catch (error) {
    next(error);
  }
};
