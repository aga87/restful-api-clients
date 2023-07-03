import dotenv from 'dotenv';
import express, { Application } from 'express';
import { routes } from './startup/routes';
import { logger } from './startup/logger';

dotenv.config();
const app: Application = express();

routes(app);

const { PORT } = process.env;
const port = PORT || 5000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
