import dotenv from 'dotenv';
import express, { Application } from 'express';
import { connectToMongoDB } from './startup/db';
import { logger } from './startup/logger';
import { routes } from './startup/routes';

dotenv.config();
export const app: Application = express();

process.on('uncaughtException', (ex: Error) => {
  logger.error(ex.message, ex);
  // Gracefully shutdown the application
  process.exit(1);
});

process.on('unhandledRejection', (ex: Error) => {
  logger.error(ex.message, ex);
  // Gracefully shutdown the application
  process.exit(1);
});

routes(app);

if (process.env.NODE_ENV !== 'test') {
  const { MONGO_DB_URI, PORT } = process.env;

  if (!MONGO_DB_URI) {
    throw new Error('FATAL ERROR: MONGO_DB_URI is not defined.');
  }

  connectToMongoDB(MONGO_DB_URI);

  const port = PORT || 5000;
  app.listen(port, () => logger.info(`Listening on port ${port}...`));
}
