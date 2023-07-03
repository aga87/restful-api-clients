import { RequestHandler, Request, Response, NextFunction } from 'express';

export const getHealthCheck: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.send('Hello World!');
  } catch (err: unknown) {
    next(err);
  }
};
