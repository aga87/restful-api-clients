import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../index';
import { Client } from '../../../models/Client';
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
      // Happy path: populate the DB with test data
      const clients: NewClient[] = [
        {
          firstName: 'a',
          lastName: 'a',
          address: {
            postalCode: 'a1'
          }
        },
        {
          firstName: 'b',
          lastName: 'b',
          address: {
            postalCode: 'b2'
          }
        }
      ];

      for (const clientData of clients) {
        const client = new Client(clientData);
        await client.save();
      }
    });

    afterEach(async () => {
      // Clean up the database
      await Client.deleteMany({});
    });

    describe('Success:', () => {
      it('should return the 200 status code', async () => {
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
      it('should return the 201 status code', async () => {
        const res = await act();
        expect(res.status).toBe(201);
      });

      it('should return the client in a decrypted format', async () => {
        const res = await act();
        const { client } = res.body;
        expect(client).toHaveProperty('_id');
        expect(client).toHaveProperty('firstName', 'a');
        expect(client).toHaveProperty('lastName', 'a');
        expect(client).toHaveProperty('address.postalCode', 'a1');
      });

      it('should save the client in the DB in an encrypted format', async () => {
        await act();
        // The document was saved in the DB
        const clientsTotal = await Client.countDocuments({});
        expect(clientsTotal).toBe(1);
        // But all fields were encrypted
        const clients1 = await Client.find({
          firstName: 'a'
        });
        expect(clients1.length).toBe(0);
        const clients2 = await Client.find({
          lastName: 'a'
        });
        expect(clients2.length).toBe(0);
        const clients3 = await Client.find({
          'address.postalCode': 'a1'
        });
        expect(clients3.length).toBe(0);
      });
    });
  });
});
