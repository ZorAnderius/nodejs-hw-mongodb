export const validateBody = (schema) => async (req, res, next) => {
  try {
    const isFavourite = req.body.isFavourite;
    req.body.isFavourite =
      isFavourite === 'true'
        ? true
        : isFavourite === 'false'
        ? false
        : isFavourite;
    await schema.validateAsync(req.body, {
      convert: false,
      abortEarly: false,
    });
    next();
  } catch (error) {
    next(error);
  }
};
