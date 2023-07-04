import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../index';
import { Client } from '../../../models/Client';
import { EncryptionService } from '../../../services/encryption';
import type { NewClient, ClientRecord } from '../../../types/types';

describe('/api/v1/clients', () => {
  beforeEach(async () => {
    // Connect to the DB
    const { MONGO_DB_TEST_URI } = process.env;

    if (!MONGO_DB_TEST_URI) {
      throw new Error('FATAL ERROR: MONGO_DB_TEST_URI is not defined.');
    }
    await mongoose.connect(MONGO_DB_TEST_URI);
  });

  afterEach(async () => {
    // Disconnect the DB
    await mongoose.connection.close();
  });

  describe('GET /', () => {
    const act = async () => await request(app).get('/api/v1/clients');

    beforeEach(async () => {
      // Happy path: prepare test data with encrypted values
      const clients: NewClient[] = [
        {
          firstName: EncryptionService.encryptData('a'),
          lastName: EncryptionService.encryptData('a'),
          address: {
            postalCode: EncryptionService.encryptData('a1')
          }
        },
        {
          firstName: EncryptionService.encryptData('b'),
          lastName: EncryptionService.encryptData('b'),
          address: {
            postalCode: EncryptionService.encryptData('b2')
          }
        }
      ];
      await Client.collection.insertMany(clients);
    });

    afterEach(async () => {
      // Clean up the database
      await Client.deleteMany({});
    });

    describe('Success:', () => {
      it('should return 200 status code', async () => {
        const res = await act();
        expect(res.status).toBe(200);
      });

      it('should return all clients in a decrypted format', async () => {
        const res = await act();
        const { clients } = res.body;
        expect(
          clients.some((client: ClientRecord) => client.firstName === 'a')
        ).toBeTruthy();
        expect(
          clients.some((client: ClientRecord) => client.lastName === 'a')
        ).toBeTruthy();
        expect(
          clients.some(
            (client: ClientRecord) => client.address.postalCode === 'a1'
          )
        ).toBeTruthy();
        expect(
          clients.some((client: ClientRecord) => client.firstName === 'b')
        ).toBeTruthy();
        expect(
          clients.some((client: ClientRecord) => client.lastName === 'b')
        ).toBeTruthy();
        expect(
          clients.some(
            (client: ClientRecord) => client.address.postalCode === 'b2'
          )
        ).toBeTruthy();
        expect(clients.length).toBe(2);
      });
    });
  });

  describe('POST /', () => {
    let newClient: any;

    const act = async () =>
      await request(app).post('/api/v1/clients').send(newClient);

    beforeEach(() => {
      // Happy path
      newClient = {
        firstName: 'a',
        lastName: 'a',
        address: {
          postalCode: 'a1'
        }
      } as NewClient;
    });

    afterEach(async () => {
      // Clean up the database
      await Client.deleteMany({});
    });

    it('should return 400 if first name is missing', async () => {
      delete newClient.firstName;
      const res = await act();
      expect(res.status).toBe(400);
    });

    it('should return 400 if first name is longer than 100 characters', async () => {
      newClient.firstName = new Array(102).join('a');
      const res = await act();
      expect(res.status).toBe(400);
    });

    it('should return 400 if last name is missing', async () => {
      delete newClient.lastName;
      const res = await act();
      expect(res.status).toBe(400);
    });

    it('should return 400 if last name is longer than 100 characters', async () => {
      newClient.lastName = new Array(102).join('a');
      const res = await act();
      expect(res.status).toBe(400);
    });

    it('should return 400 if address is missing', async () => {
      delete newClient.address;
      const res = await act();
      expect(res.status).toBe(400);
    });

    it('should return 400 if postal code is missing', async () => {
      newClient.address.postalCode = undefined;
      const res = await act();
      expect(res.status).toBe(400);
    });

    it('should return 400 if postal code is longer than 30 characters', async () => {
      newClient.address.postalCode = new Array(32).join('a');
      const res = await act();
      expect(res.status).toBe(400);
    });

    describe('If the client data is valid / Success:', () => {
      it('should save the client in the DB in an encrypted format', async () => {
        await act();
        const client = await Client.find({
          firstName: EncryptionService.encryptData('a')
        });
        expect(client).not.toBeNull();
      });

      it('should return the client in a decrypted format', async () => {
        const res = await act();
        const { client } = res.body;
        expect(client).toHaveProperty('_id');
        expect(client).toHaveProperty('firstName', 'a');
        expect(client).toHaveProperty('lastName', 'a');
        expect(client).toHaveProperty('address.postalCode', 'a1');
      });

      it('should return the 201 status code', async () => {
        const res = await act();
        expect(res.status).toBe(201);
      });
    });
  });
});
