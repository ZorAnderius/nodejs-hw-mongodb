export const validateBody = (schema) => async (req, res, next) => {
  try {
    if (req.body.isFavourite) {
      req.body.isFavourite =
        req.body.isFavourite === 'true'
          ? true
          : req.body.isFavourite === 'false'
          ? false
          : req.body.isFavourite;
    }
    await schema.validateAsync(req.body, {
      convert: false,
      abortEarly: false,
    });
    next();
  } catch (error) {
    next(error);
  }
};
