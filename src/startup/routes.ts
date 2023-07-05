import express, { Application } from 'express';
import cors from 'cors';
import { corsOptions } from '../config/cors';
import { clients } from '../routes/clients';
import { healthCheck } from '../routes/health-check';
import { errorMiddleware } from '../middleware/error';

export const routes = (app: Application) => {
  app.use(cors(corsOptions));
  app.use(express.json()); // middleware for parsing application/json
  app.use('/', healthCheck);
  app.use('/api/v1/clients', clients);
  app.use(errorMiddleware);
};
