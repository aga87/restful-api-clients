import dotenv from 'dotenv';
import express, { Application } from 'express';
import { routes } from './startup/routes';
import { logger } from './startup/logger';

dotenv.config();
const app: Application = express();

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

const { PORT } = process.env;
const port = PORT || 5000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
