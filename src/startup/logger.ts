import dotenv from 'dotenv';
import { createLogger, format, transports, Logger } from 'winston';

dotenv.config();

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
  level: 'info'
});

// Log events and errors to the console in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: consoleLogFormat
    })
  );
}
