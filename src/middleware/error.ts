import { ErrorRequestHandler } from 'express';
import { logger } from '../startup/logger';
import { healthCheckHATEOAS, selfHATEOAS } from '../utils/hateoas';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  logger.error('Unexpected server error', err);
  res.status(500).send({
    error: 'Unexpected server error',
    _links: [selfHATEOAS(req), healthCheckHATEOAS()]
  });
};
