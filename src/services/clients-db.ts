import { Client } from '../models/Client';
import type { ClientRecord, NewClient } from '../types/types';

export const getClientsFromDB = async ({
  skip,
  pageSize
}: {
  skip: number;
  pageSize: number;
}): Promise<ClientRecord[]> => {
  const clients: ClientRecord[] = await Client.find({})
    .select('-__v')
    .sort({ name: 1 })
    .skip(skip)
    .limit(pageSize);
  return clients;
};

export const getClientsTotalInDB = async (): Promise<number> =>
  await Client.countDocuments({});

export const addClientToDB = async (
  newClient: NewClient
): Promise<ClientRecord> => {
  const savedClient: ClientRecord = await new Client(newClient).save();
  // Note: using findById would not trigger the post-find middleware
  const client = await Client.find({ _id: savedClient._id }).select('-__v');
  if (!client[0]) {
    throw new Error('Could not find the saved client record in the database');
  }
  return client[0];
};
