import { Schema, model } from 'mongoose';
import type { ClientRecord } from '../types/types';

const clientSchema = new Schema<ClientRecord>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    postalCode: {
      type: String,
      required: true
    }
  }
});

export const Client = model<ClientRecord>('Client', clientSchema);
