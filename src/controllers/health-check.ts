import { RequestHandler, Request, Response, NextFunction } from 'express';
import { isDBConnected } from '../startup/db';

export const getHealthCheck: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const serverHealthCheck = 'Healthy.';
    const isConnected = isDBConnected();

    if (isConnected) {
      return res.send({
        serverHealthCheck,
        DBHealthCheck: 'Healthy. DB connected.'
      });
    } else {
      return res.status(503).send({
        serverHealthCheck,
        DBHealthCheck: 'Unhealthy. DB connection not established.'
      });
    }
  } catch (err: unknown) {
    next(err);
  }
};
