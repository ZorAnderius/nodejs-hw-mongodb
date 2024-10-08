import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err.name,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something wrong on our side',
    error: err.message,
    data: err.name,
  });
};
