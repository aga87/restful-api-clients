import mongoose from 'mongoose';
import { logger } from './logger';

export const connectToMongoDB = async (mongoURI: string): Promise<void> => {
  try {
    await mongoose.connect(mongoURI);
    logger.info('Connected to MongoDB');
  } catch (err: unknown) {
    logger.error('Could not connect to MongoDB...', err);
  }
};

export const isDBConnected = (): boolean =>
  mongoose.connection.readyState === 1;
