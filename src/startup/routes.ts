import express, { Application } from 'express';
import { healthCheck } from '../routes/health-check';

export const routes = (app: Application) => {
  app.use(express.json()); // middleware for parsing application/json
  app.use('/', healthCheck);
};
