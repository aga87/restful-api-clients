import { RequestHandler, Request, Response, NextFunction } from 'express';
import { isDBConnected } from '../startup/db';
import { clientsHATEOAS, selfHATEOAS } from '../utils/hateoas';

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
        DBHealthCheck: 'Healthy. DB connected.',
        _links: [
          selfHATEOAS(req),
          clientsHATEOAS().clients,
          clientsHATEOAS().addClient
        ]
      });
    } else {
      return res.status(503).send({
        serverHealthCheck,
        DBHealthCheck: 'Unhealthy. DB connection not established.',
        _links: [selfHATEOAS(req)]
      });
    }
  } catch (err: unknown) {
    next(err);
  }
};
