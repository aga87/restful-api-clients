import { RequestHandler, Request, Response } from 'express';
import { logger } from '../startup/logger';

export const getHealthCheck: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    return res.send('Hello World!');
  } catch (err: unknown) {
    logger.error('Unexpected Server Error:', err);
    return res.status(500).send('Unexpected Server Error');
  }
};
