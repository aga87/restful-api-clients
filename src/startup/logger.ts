import dotenv from 'dotenv';
import { createLogger, format, transports, Logger } from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

dotenv.config();

const { GOOGLE_KMS_PROJECT_ID } = process.env;

if (!GOOGLE_KMS_PROJECT_ID) {
  throw new Error(
    'Missing GOOGLE_KMS_PROJECT_ID variable for logging to Cloud Logger'
  );
}

const cloudLogger = new LoggingWinston({
  projectId: GOOGLE_KMS_PROJECT_ID
});

// Define logging formats
const consoleLogFormat = format.combine(
  format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  format.colorize(), // has to be called first
  format.simple(),
  format.printf((msg) => {
    return `[LOGGER] ${msg.timestamp} ${msg.level} ${msg.message}`;
  })
);

// Set up the logger
export const logger: Logger = createLogger({
  level: process.env.NODE_ENV !== 'production' ? 'info' : 'error'
});

// Log events and errors to the console in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: consoleLogFormat
    })
  );
} else {
  // Log errors to Google Cloud Logging in production
  logger.add(cloudLogger);
}
