import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../index';

describe('/ - HEALTH CHECK', () => {
  beforeEach(async () => {
    // Connect to the DB
    const { MONGO_DB_TEST_URI } = process.env;

    if (!MONGO_DB_TEST_URI) {
      throw new Error('FATAL ERROR: MONGO_DB_TEST_URI is not defined.');
    }
    await mongoose.connect(MONGO_DB_TEST_URI);
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  describe('GET /', () => {
    const act = async () => await request(app).get('/');

    it('should return the 503 status code when the database connection is not established', async () => {
      // Disconnect from the database to simulate a connection failure
      await mongoose.connection.close();
      const res = await act();
      expect(res.status).toBe(503);
    });

    it('should return the 200 status code when the database is connected', async () => {
      const res = await act();
      expect(res.status).toBe(200);
    });
  });
});
