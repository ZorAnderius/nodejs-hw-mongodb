import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err.name,
    });
  }

  if (err.isJoi) {
    return res.status(400).json({
      status: 400,
      message: 'Validation error!',
      data: err.details.map((error) => ({
        message: error.message,
        path: error.path,
      })),
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something wrong on our side',
    error: err.message,
    data: err.name,
  });
};
