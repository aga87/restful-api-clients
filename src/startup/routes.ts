import express, { Application } from 'express';
import { healthCheck } from '../routes/health-check';
import { errorMiddleware } from '../middleware/error';

export const routes = (app: Application) => {
  app.use(express.json()); // middleware for parsing application/json
  app.use('/', healthCheck);
  app.use(errorMiddleware);
};
