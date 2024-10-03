import { HttpError } from 'http-errors';

export const errorHandle = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }
  const { status = 500, message } = err;
  const errMsg = status === 500 ? 'Something went wrong' : message;
  res.status(status).json({
    status: status,
    message: errMsg,
  });
};
