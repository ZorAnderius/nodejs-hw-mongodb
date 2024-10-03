import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
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
  console.dir(err);
  res.status(status).json({
    status: status,
    message: errMsg,
    data: err?.type,
  });
};
